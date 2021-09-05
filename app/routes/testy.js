module.exports = {
  method: 'GET',
  path: '/testy/test',
  handler: async (request, h) => {
    console.log('Testy test')
    console.log(request.auth.credentials)

    return h.view('home', {
      username: request.auth.credentials.account.username,
      permissions: request.auth.credentials.permissions
    })
  }
}
