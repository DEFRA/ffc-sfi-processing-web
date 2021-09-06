const config = require('../config')
const authCookie = require('@hapi/cookie')
const bell = require('@hapi/bell')

module.exports = {
  plugin: {
    name: 'auth',
    register: async (server) => {
      await server.register(authCookie)
      await server.register(bell)

      server.auth.strategy('session-auth', 'cookie', {
        cookie: {
          name: 'session-auth',
          password: config.authConfig.cookie.password,
          ttl: config.authConfig.cookie.ttl,
          path: '/',
          isSecure: config.isProd,
          isSameSite: 'Strict'
        },
        keepAlive: true, // Resets the cookie ttl after each route
        redirectTo: '/login'
      })

      server.auth.strategy('azure', 'bell', {
        provider: 'azure',
        clientId: config.authConfig.azure.clientId,
        clientSecret: config.authConfig.azure.clientSecret,
        config: {
          tenant: config.authConfig.azure.tenantId
        },
        password: config.authConfig.cookie.password,
        isSecure: config.isProd
      })

      server.auth.default('session-auth')
    }
  }
}
