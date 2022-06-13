# !bin/bash
set -e
# V0.2 传入指定参数

# 0. 获取参数：所需node版本、开发git路径、项目名称、git文件夹名称、打包git地址、打包文件夹名称
echo "【### 开始执行 $0，获取参数：】"
echo "参数1. node版本 = $1"
NODE_VERSION=$1
echo "参数2. 开发git路径 = $2"
DEV_GIT_SOURCE=$2
name_git=${DEV_GIT_SOURCE##*/}
DEV_GIT_NAME=${name_git%.*}
echo "DEV_GIT_NAME: $DEV_GIT_NAME"
echo "参数3. 打包分支test/test_tmp = $3"
DEV_BRANCH_NAME=$3
echo "参数4. 项目名称（dev里packages的文件夹名称） = $4"
DEV_PROJECT_NAME=$4
echo "参数5. 打包环境 = $5"
ENV_NAME=$5
echo "参数6. 目标git路径 = $6"
TARGET_GIT_SOURCE=$6
target_name_git=${TARGET_GIT_SOURCE##*/}
TARGET_GIT_NAME=${target_name_git%.*}
echo "TARGET_GIT_NAME: $TARGET_GIT_NAME"
echo "参数7. 目标git文件夹名称 = $7"
TARGET_PROJECT_NAME=$7
echo "参数8. 打包产物html名称 = $8"
BUILD_HTML_NAME=$8
echo "参数9. 打包产物文件夹名称 = $9"
BUILD_FOLDER_NAME=$9
echo "参数10. 开发分支打包后产物路径（一般为dist） = ${10}"
DEV_BUILD_SRC=${10}

# 1. 根据项目所需node版本进行node版本切换 v16.13.0/v11.11.0
# todo mac和linux不同
echo "【### 切换所需node版本】"
sudo npm i -g n --registry=https://registry.npm.taobao.org
sudo n $1
echo "【#### 当前node版本】"
node -v
# 2. 创建各个文件夹:dev、test、pre、prod
CURRENT_DIR=$(pwd)
echo "【### 判断文件夹是否存在，不存在则创建】"
SOURCECODE_DIR=$CURRENT_DIR/sourceCode
SOURCECODE_DEV_DIR=$SOURCECODE_DIR/dev
SOURCECODE_TEST_DIR=$SOURCECODE_DIR/test
SOURCECODE_PRE_DIR=$SOURCECODE_DIR/pre
SOURCECODE_PROD_DIR=$SOURCECODE_DIR/prod

mkdir -p $SOURCECODE_DEV_DIR
mkdir -p $SOURCECODE_TEST_DIR
mkdir -p $SOURCECODE_PRE_DIR
mkdir -p $SOURCECODE_PROD_DIR
# 3. 进入dev文件夹下载开发源码并打包
echo '【### dev文件夹】'
echo '【#### 下载开发源码】'
cd $SOURCECODE_DEV_DIR
GIT_DIR_NAME=$SOURCECODE_DEV_DIR/$DEV_GIT_NAME
if [ ! -d "$GIT_DIR_NAME" ]; then
  git clone $DEV_GIT_SOURCE
fi
echo "【#### 切换到test/test_tmp分支】"
cd $GIT_DIR_NAME
git reset HEAD --hard
git checkout $DEV_BRANCH_NAME
echo "【#### 拉取最新的代码】"
git pull origin $DEV_BRANCH_NAME
# todo 包管理工具升级pnpm
echo "【### 安装依赖】"
cd $GIT_DIR_NAME/packages/$DEV_PROJECT_NAME
sudo cnpm i -s
echo "【### 打包dist：npm run build:${ENV_NAME}】"
npm run build:$ENV_NAME

# 3. 进入目标环境文件夹下载开发源码并替换文件
echo "【### 目标环境文件夹】"
echo "【#### 下载对应git代码】"
cd $SOURCECODE_DIR/$ENV_NAME
GIT_TEST_DIR_NAME=$SOURCECODE_DIR/$ENV_NAME/$TARGET_GIT_NAME
if [ ! -d "$GIT_TEST_DIR_NAME" ]; then
  git clone $TARGET_GIT_SOURCE
fi
echo "【#### 切换到具体环境分支】"
cd $GIT_TEST_DIR_NAME
git reset HEAD --hard
git checkout $ENV_NAME
echo "【#### 拉取最新的代码】"
git pull origin $ENV_NAME
# 删除指定文件并替换
cd $GIT_TEST_DIR_NAME/$TARGET_PROJECT_NAME
echo "【#### 删除老文件】"
FOLDER_NAME_PWD=$GIT_TEST_DIR_NAME/$TARGET_PROJECT_NAME/$BUILD_HTML_NAME
if [ -d "$FOLDER_NAME_PWD" ]; then
  echo "删除html:$FOLDER_NAME_PWD"
  rm -rf $FOLDER_NAME_PWD
fi

dir_array=(${BUILD_FOLDER_NAME//、/ })  
for FOLDER_NAME in ${dir_array[@]}
do
  if [ -d "$FOLDER_NAME" ]; then
    echo "删除文件夹:$FOLDER_NAME"
    rm -rf $GIT_TEST_DIR_NAME/$TARGET_PROJECT_NAME/$FOLDER_NAME
  fi
done 
echo "【#### 替换文件，将$GIT_DIR_NAME/packages/$DEV_PROJECT_NAME/$DEV_BUILD_SRC/. 复制到 $GIT_TEST_DIR_NAME/$TARGET_PROJECT_NAME】"
cp -a $GIT_DIR_NAME/packages/$DEV_PROJECT_NAME/$DEV_BUILD_SRC/. $GIT_TEST_DIR_NAME/$TARGET_PROJECT_NAME
echo "【#### 替换后文件列表】"
ls -lh
echo "【#### 判断打包后是否有改动】"
STAGE_FILES=$(git diff --name-only)
if test ${#STAGE_FILES} -gt 0
then
  for FILE in $STAGE_FILES
  do
    echo "改动文件名称：$FILE"
  done
  git branch
  git add .
  git commit -m "fix:($DEV_PROJECT_NAME)($ENV_NAME) 项目自动打包"
  git push origin $ENV_NAME
  echo '【代码推送成功，结束】'
else
  echo '【没有文件改动，结束】'
fi
# pnpm i -g anywhere
# todo 启动静态文件服务器并定时时间关闭
# exit 0
# echo "【4. 启动http服务验证】"
# function rand(){ 
#  min=$1 
#  max=$(($2-$min+1)) 
#  num=$(($RANDOM+1000000000)) #增加一个10位的数再求余 
#  echo $(($num%$max+$min)) 
# }  
# rnd=$(rand 11000 20000) 
# anywhere $rnd 