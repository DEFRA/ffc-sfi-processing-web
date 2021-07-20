module.exports = {
  method: 'GET',
  path: '/payment-requests',
  options: {
    handler: (request, h) => {
      return h.view('payment-requests')
    }
  }
}
