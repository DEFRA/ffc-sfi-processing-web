const Joi = require('joi')
const { getAgreements, payAgreement } = require('../agreements')
const { getPagination, getPagingData } = require('../pagination')
const azureAuth = require('../azure-auth')

module.exports = [{
  method: 'GET',
  path: '/agreements',
  options: {
    validate: {
      query: Joi.object({
        page: Joi.number().greater(0).default(1),
        limit: Joi.number().greater(0).default(20)
      })
    },
    handler: async (request, h) => {
      const { limit, offset } = getPagination(request.query.page, request.query.limit)
      const { agreements, total } = await getAgreements(undefined, limit, offset)
      const pagingData = getPagingData(total, limit, request.query.page, request.headers.path)
      return h.view('agreements', { agreements, permissions: request.auth.credentials.permissions, ...pagingData })
    }
  }
},
{
  method: 'GET',
  path: '/agreement',
  handler: async (request, h) => {
    const { agreements } = await getAgreements(request.query.agreementId)
    return h.view('agreement', { agreements })
  }
},
{
  method: 'POST',
  path: '/agreement/pay',
  options: {
    validate: {
      payload: Joi.object({
        agreementId: Joi.number().required()
      }),
      failAction: async (request, h, error) => {
        const { agreements } = await getAgreements(request.payload.agreementId)
        return h.view('agreements', { agreements, error: true, permissions: request.auth.credentials.permissions }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      try {
        const permissions = await azureAuth.refresh(request.auth.credentials.account, request.cookieAuth)

        if (!permissions.approvePayments) {
          const { agreements } = await getAgreements(request.payload.agreementId)
          return h.view('agreements', {
            agreements,
            permissions,
            error: true
          }).code(400).takeover()
        }
      } catch (err) {
        console.log('Failed to refresh authentication, logging user out')
        console.log(err)
        return h.redirect('/logout')
      }

      const readyToPay = await payAgreement(request.payload.agreementId)
      if (readyToPay) {
        return h.redirect(`/payment-requests?agreementId=${request.payload.agreementId}`)
      }
      const { agreements } = await getAgreements(request.payload.agreementId)
      return h.view('agreements', { agreements, error: true, permissions: request.auth.credentials.permissions }).code(400).takeover()
    }
  }
}
]
