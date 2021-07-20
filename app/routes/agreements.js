module.exports = {
  method: 'GET',
  path: '/agreements',
  options: {
    handler: (request, h) => {
      return h.view('agreements')
    }
  }
}
