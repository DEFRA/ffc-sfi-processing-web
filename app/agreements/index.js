const createAgreement = require('./create-agreement')
const getAgreements = require('./get-agreements')
const getTasks = require('./get-tasks')
const getPaymentRequests = require('./get-payment-requests')
const closeTask = require('./close-task')
const payAgreement = require('./pay-agreement')

module.exports = {
  createAgreement,
  getAgreements,
  getTasks,
  getPaymentRequests,
  closeTask,
  payAgreement
}
