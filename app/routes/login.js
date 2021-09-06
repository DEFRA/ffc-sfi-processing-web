module.exports = {
  method: 'GET',
  path: '/login',
  options: {
    auth: false
  },
  handler: (request, h) => {
    return h.view('login')
  }
}
