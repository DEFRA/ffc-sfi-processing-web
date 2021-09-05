const azureAuth = require('../azure-auth')

module.exports = [
  {
    method: 'GET',
    path: '/login',
    options: {
      auth: false
    },
    handler: (request, h) => {
      return h.view('login')
    }
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      auth: { mode: 'try' }
    },
    handler: async (request, h) => {
      try {
        const redirectUrlCode = await azureAuth.getRedirectUrl()
        return h.redirect(redirectUrlCode)
      } catch (err) {
        console.log('Error authenticating')
        console.log(JSON.stringify(err))
      }

      return h.view('500').code(500)
    }
  }
]
