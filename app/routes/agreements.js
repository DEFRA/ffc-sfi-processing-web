const { getAgreements } = require('../agreements')

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
}]
