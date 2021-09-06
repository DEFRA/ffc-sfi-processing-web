const permissions = require('../permissions')
const jwtDecode = require('jwt-decode')
const wreck = require('@hapi/wreck')
const Querystring = require('querystring')
const config = require('../config')
const refreshUrl = `https://login.microsoftonline.com/${config.authConfig.azure.tenantId}/oauth2/v2.0/token`

async function refresh (account, cookieAuth) {
  const refreshTokenPayload = {
    grant_type: 'refresh_token',
    client_secret: config.authConfig.azure.clientSecret,
    client_id: config.authConfig.azure.clientId,
    refresh_token: account.refreshToken
  }

  const response = await wreck.post(refreshUrl, {
    payload: Querystring.stringify(refreshTokenPayload),
    json: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  return setAuthCookie(response.payload, cookieAuth)
}

function setAuthCookie (authArtifacts, cookieAuth) {
  const decodedIdToken = jwtDecode(authArtifacts.id_token)
  const perms = permissions(decodedIdToken.roles)

  cookieAuth.set({
    permissions: perms,
    account: {
      username: decodedIdToken.preferred_username,
      refreshToken: authArtifacts.refresh_token
    }
  })

  return perms
}

module.exports = {
  setAuthCookie,
  refresh
}
