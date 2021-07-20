const { getAgreements } = require('../agreements')

module.exports = {
  method: 'GET',
  path: '/agreements',
  options: {
    handler: async (request, h) => {
      const agreements = await getAgreements()
      return h.view('agreements', { agreements })
    }
  }
}
