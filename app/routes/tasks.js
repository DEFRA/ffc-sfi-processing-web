const Joi = require('joi')
const { getTasks, closeTask } = require('../agreements')
const { getPagination, getPagingData } = require('../pagination')

module.exports = [{
  method: 'GET',
  path: '/tasks',
  options: {
    validate: {
      query: Joi.object({
        agreementId: Joi.number().optional(),
        page: Joi.number().greater(0).default(1),
        limit: Joi.number().greater(0).default(20)
      })
    },
    handler: async (request, h) => {
      const { limit, offset } = getPagination(request.query.page, request.query.limit)
      const { tasks, total } = await getTasks(undefined, limit, offset)
      const pagingData = getPagingData(total, limit, request.query.page, request.headers.path)
      return h.view('tasks', { tasks, ...pagingData })
    }
  }
}, {
  method: 'POST',
  path: '/task/close',
  options: {
    validate: {
      payload: Joi.object({
        agreementId: Joi.number().required(),
        taskId: Joi.number().required()
      }),
      failAction: async (request, h, error) => {
        const { tasks } = await getTasks(request.payload.agreementId)
        return h.view('task', { tasks, error: true }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await closeTask(request.payload.taskId)
      return h.redirect(`/tasks?agreementId=${request.payload.agreementId}`)
    }
  }
}]
