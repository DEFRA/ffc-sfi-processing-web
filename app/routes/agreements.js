const Joi = require('joi')
const { getAgreements, payAgreement } = require('../agreements')

module.exports = [{
  method: 'GET',
  path: '/agreements',
  options: {
    handler: async (request, h) => {
      const agreements = await getAgreements()
      return h.view('agreements', { agreements })
    }
  }
}, {
  method: 'GET',
  path: '/agreement',
  options: {
    handler: async (request, h) => {
      const agreements = await getAgreements(request.query.agreementId)
      return h.view('agreement', { agreements })
    }
  }
}, {
  method: 'POST',
  path: '/agreement/pay',
  options: {
    validate: {
      payload: Joi.object({
        agreementId: Joi.number().required()
      }),
      failAction: async (request, h, error) => {
        const agreements = await getAgreements(request.payload.agreementId)
        return h.view('agreements', { agreements, error: true }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const readyToPay = await payAgreement(request.payload.agreementId)
      if (readyToPay) {
        return h.redirect(`/payment-requests?agreementId=${request.payload.agreementId}`)
      }
      const agreements = await getAgreements(request.payload.agreementId)
      return h.view('agreements', { agreements, error: true }).code(400).takeover()
    }
  }
}]
