module.exports = {
  method: 'GET',
  path: '/',
  handler: async (request, h) => {
    console.log('HOME')
    console.log(request.auth.credentials)

    return h.view('home', {
      username: request.auth.credentials.account.username,
      permissions: request.auth.credentials.permissions
    })
  }
}
