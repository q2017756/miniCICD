const services = require('../service/project.js')
const Validator = require('fastest-validator')
const Boom = require('@hapi/boom');
const v = new Validator()

module.exports = {
  /**
   * 新增，必传除了status以外字段
   * @param {*} ctx 
   * @returns 
   */
  create: async ctx => {
    const { request: { body }, response } = ctx
    const schema = {
      name: { max: 60, min: 1, type: 'string' },
      nodeEnv: { max: 10, min: 1, type: 'string' },
      gitRepository: { max: 255, min: 5, type: 'string' },
      gitProjectName: { max: 255, min: 5, type: 'string' },
      desc: { max: 255, min: 5, type: 'string' },
      people: { max: 255, min: 5, type: 'string' }
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
    await services.create(body)
    response.body = {
      message: '新增成功',
      result: '新增成功',
      success: true
    }
  },
  /**
   * 获取列表，可根据id、name、staus查询
   * @param {*} ctx 
   * @returns 
   */
  getList: async ctx => {
    console.log('getList')
    const { request: { body }, response } = ctx
    const schema = {
      id: { type: 'number', optional: true },
      name: { type: 'string', optional: true },
      status: { type: 'string', optional: true },
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
    const entity = await services.findAll(body)
    response.body = {
      message: '查找成功',
      result: entity,
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
  /**
   * 删除非物理删除，只是修改状态
   * @param {*} ctx 
   * @returns 
   */
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
    const entity = await services.find(body)
    await services.update({
      ...entity.dataValues,
      status: 'UNUSE'
    })
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
      nodeEnv: { max: 10, min: 1, type: 'string' },
      gitRepository: { max: 255, min: 5, type: 'string' },
      gitProjectName: { max: 255, min: 5, type: 'string' },
      desc: { max: 255, min: 5, type: 'string' },
      people: { max: 255, min: 5, type: 'string' }
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