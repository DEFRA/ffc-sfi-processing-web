const { getPaymentRequests } = require('../agreements')
const { getPagination, getPagingData } = require('../pagination')
const Joi = require('joi')

module.exports = {
  method: 'GET',
  path: '/payment-requests',
  options: {
    validate: {
      query: Joi.object({
        page: Joi.number().greater(0).default(1),
        limit: Joi.number().greater(0).default(20)
      })
    },
    handler: async (request, h) => {
      const { limit, offset } = getPagination(request.query.page, request.query.limit)
      const { paymentRequests, total } = await getPaymentRequests(request.query.agreementId, limit, offset)
      const pagingData = getPagingData(total, limit, request.query.page, request.headers.path)
      return h.view('payment-requests', { paymentRequests, ...pagingData })
    }
  }
}
