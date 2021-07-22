const createAgreement = require('./create-agreement')
const getAgreements = require('./get-agreements')
const getTasks = require('./get-tasks')
const { getPaymentRequests, getPendingPayments } = require('./get-payment-requests')
const updatePublishedPayments = require('./update-published-payments')
const closeTask = require('./close-task')
const payAgreement = require('./pay-agreement')

module.exports = {
  createAgreement,
  getAgreements,
  getTasks,
  getPaymentRequests,
  closeTask,
  payAgreement,
  getPendingPayments,
  updatePublishedPayments
}
