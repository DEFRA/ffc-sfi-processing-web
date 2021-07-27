const Joi = require('joi')
const { getTasks, closeTask } = require('../agreements')

module.exports = [{
  method: 'GET',
  path: '/tasks',
  options: {
    handler: async (request, h) => {
      const tasks = await getTasks(request.query.agreementId)
      return h.view('tasks', { tasks })
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
        const tasks = await getTasks(request.payload.agreementId)
        return h.view('task', { tasks, error: true }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await closeTask(request.payload.taskId)
      return h.redirect(`/tasks?agreementId=${request.payload.agreementId}`)
    }
  }
}]
