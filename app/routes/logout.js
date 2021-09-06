module.exports = {
  method: 'GET',
  path: '/logout',
  handler: (request, h) => {
    request.cookieAuth.clear()
    return h.redirect('/login')
  }
}
