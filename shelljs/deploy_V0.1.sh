# !bin/bash
set -e
# v0.1，拿campus测试
CURRENT_DIR=$(pwd)
echo "【1. 判断文件夹是否存在，不存在则创建】"
SOURCECODE_DIR=${CURRENT_DIR}/sourceCode
SOURCECODE_DEV_DIR=${SOURCECODE_DIR}/dev
SOURCECODE_TEST_DIR=${SOURCECODE_DIR}/test
SOURCECODE_PRE_DIR=${SOURCECODE_DIR}/pre
SOURCECODE_PROD_DIR=${SOURCECODE_DIR}/prod

mkdir -p ${SOURCECODE_DEV_DIR}
mkdir -p ${SOURCECODE_TEST_DIR}
mkdir -p ${SOURCECODE_PRE_DIR}
mkdir -p ${SOURCECODE_PROD_DIR}

echo '【2. 开发】'
echo '【2.1 下载开发源码】'
cd ${SOURCECODE_DEV_DIR}
GIT_DIR_NAME=${SOURCECODE_DEV_DIR}/o2o-fund-service-h5
if [ ! -d "${GIT_DIR_NAME}" ]; then
  git clone git@gitlab.bestpay.com.cn:o2o/o2o-fund-service-h5.git
fi
echo "【2.2 切换到test分支】"
cd ${GIT_DIR_NAME}
git checkout test
echo "【2.3 拉取最新的代码】"
git pull origin test

echo "【2.4 安装依赖，打包dist】"
cd ${GIT_DIR_NAME}/packages/campus
pnpm i -s
pnpm run build:test
echo "【3. test】"
echo "【3.1 下载test代码】"
cd ${SOURCECODE_TEST_DIR}
GIT_TEST_DIR_NAME=${SOURCECODE_TEST_DIR}/campus
if [ ! -d "${GIT_TEST_DIR_NAME}" ]; then
  git clone git@gitlab.bestpay.com.cn:mbp/campus.git
fi
echo "【3.2 切换到test分支】"
cd ${GIT_TEST_DIR_NAME}
git checkout test
echo "【3.3 拉取最新的代码】"
git pull origin test
echo "【3.4 创建新的文件夹，备份旧的文件夹】"
mv ${GIT_TEST_DIR_NAME}/campus ${GIT_TEST_DIR_NAME}/campus-bak
mkdir ${GIT_TEST_DIR_NAME}/campus
echo "【3.5 将开发分支打包后的dist复制到新创建的文件夹】"
cp -a ${GIT_DIR_NAME}/packages/campus/dist/. ${GIT_TEST_DIR_NAME}/campus
rm -rf ${GIT_TEST_DIR_NAME}/campus-bak

echo "【3.6 判断打包后是否有改动】"
STAGE_FILES=$(git diff --name-only)
echo "【3.7 改动文件列表${STAGE_FILES}】"
if test ${#STAGE_FILES} -gt 0
then
  git add .
  git commit -m "fix:(campus)(test) 测试test"
  git push origin test
  echo '【代码推送成功，结束】'
else
  echo '【没有文件改动，结束】'
fi

# echo "【4. 启动http服务验证】"
# pnpm i -g anywhere
# function rand(){ 
#  min=$1 
#  max=$(($2-$min+1)) 
#  num=$(($RANDOM+1000000000)) #增加一个10位的数再求余 
#  echo $(($num%$max+$min)) 
# }  
# rnd=$(rand 11000 20000) 
# anywhere $rnd 