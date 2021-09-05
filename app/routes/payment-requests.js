const { getPaymentRequests } = require('../agreements')

module.exports = {
  method: 'GET',
  path: '/payment-requests',
  options: {
    handler: async (request, h) => {
      console.log(JSON.stringify(request.auth.credentials, null, 2))
      const paymentRequests = await getPaymentRequests(request.query.agreementId)
      return h.view('payment-requests', { paymentRequests })
    }
  }
}
