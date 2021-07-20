module.exports = {
  method: 'GET',
  path: '/tasks',
  options: {
    handler: (request, h) => {
      return h.view('tasks')
    }
  }
}
