const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/home'),
  require('../routes/tasks'),
  require('../routes/agreements'),
  require('../routes/payment-requests'),
  require('../routes/login'),
  require('../routes/logout'),
  require('../routes/authenticate')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
