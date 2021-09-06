const azureAuth = require('../azure-auth')

module.exports = {
  method: 'GET',
  path: '/authenticate',
  options: {
    auth: {
      mode: 'try',
      strategy: 'azure'
    }
  },
  handler: async (request, h) => {
    if (request.auth.isAuthenticated) {
      azureAuth.setAuthCookie(request.auth.artifacts, request.cookieAuth)
      return h.redirect('/')
    }

    console.log('Error authenticating')
    return h.view('500').code(500)
  }
}
