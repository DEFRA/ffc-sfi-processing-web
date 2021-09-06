module.exports = {
  method: 'GET',
  path: '/',
  handler: async (request, h) => {
    return h.view('home', {
      username: request.auth.credentials.account.username,
      permissions: request.auth.credentials.permissions
    })
  }
}
