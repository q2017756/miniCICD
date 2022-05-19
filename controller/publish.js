const services = require('../service/publish.js')
const projectServices = require('../service/project.js')
const Validator = require('fastest-validator')
const Boom = require('@hapi/boom');
const v = new Validator()

module.exports = {
  deploy: async (body, response) => {
    const schema = {
      projectId: { type: 'number' },
      branchName: { max: 10, min: 1, type: 'string' },
      envType: { max: 10, min: 1, type: 'string' },
      operator: { max: 255, min: 4, type: 'string' }
    }
    const errors = v.validate(body, schema)
    if (Array.isArray(errors) && errors.length) {
      return {
        projectName: '',
        errorMsg: '参数错误'
      }
    }
    const projectEntity = await projectServices.find({
      id: body.projectId
    })
    if (!projectEntity) {
      return {
        projectName: '',
        errorMsg: '项目不存在'
      }
    }
    const projectValue = projectEntity.dataValues
    return {
      projectName: projectValue.name,
      branchName: body.branchName,
      nodeEnv: projectValue.nodeEnv,
      envType: body.envType,
      gitRepository: projectValue.gitRepository,
      gitProjectName: projectValue.gitProjectName,
      buildHtml: projectValue.buildHtml,
      buildFolder: projectValue.buildFolder
    }
  },
  getList: async ctx => {
    console.log('getList')
    const { request: { body }, response } = ctx
    const schema = {
      id: { type: 'number', optional: true },
      branchName: { type: 'string', optional: true },
      envType: { type: 'string', optional: true }
    }
    const errors = v.validate(body, schema)
    if (Array.isArray(errors) && errors.length) {
      ctx.response.status = 500
      return response.body = {
        errorMsg: Boom.badRequest(null, errors),
        result: '参数错误',
        success: false
      }
    }
    const entityList = await services.findAll(body)
    response.body = {
      message: '查找成功',
      result: entityList,
      success: true
    }
  },
  getInfo: async ctx => {
    console.log('getInfo')
    const { request: { body }, response } = ctx
    const schema = {
      id: { type: 'number' },
    }
    const errors = v.validate(body, schema)
    if (Array.isArray(errors) && errors.length) {
      ctx.response.status = 500
      return response.body = {
        errorMsg: Boom.badRequest(null, errors),
        result: '参数错误',
        success: false
      }
    }
    const entity = await services.find(body)
    response.body = {
      message: '查找成功',
      result: entity,
      success: true
    }
  },
  delete: async ctx => {
    console.log('delete')
    const { request: { body }, response } = ctx
    const schema = {
      id: { type: 'number' },
    }
    const errors = v.validate(body, schema)
    if (Array.isArray(errors) && errors.length) {
      ctx.response.status = 500
      return response.body = {
        errorMsg: Boom.badRequest(null, errors),
        result: '参数错误',
        success: false
      }
    }
    await services.delete(body)
    response.body = {
      message: '删除成功',
      result: '',
      success: true
    }
  },
  update: async ctx => {
    console.log('update')
    const { request: { body }, response } = ctx
    const schema = {
      id: { type: 'number' },
      name: { max: 60, min: 1, type: 'string' },
      gitRepository: { max: 255, min: 5, type: 'string' },
      desc: { max: 255, min: 5, type: 'string' },
      people: { max: 255, min: 5, type: 'string' },
    }
    const errors = v.validate(body, schema)
    if (Array.isArray(errors) && errors.length) {
      ctx.response.status = 500
      return response.body = {
        errorMsg: Boom.badRequest(null, errors),
        result: '参数错误',
        success: false
      }
    }
    await services.update(body)
    response.body = {
      message: '更新成功',
      result: '更新成功',
      success: true
    }
  },
} 