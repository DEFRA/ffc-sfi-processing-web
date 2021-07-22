const createAgreement = require('./create-agreement')
const getAgreements = require('./get-agreements')
const getTasks = require('./get-tasks')
const createTask = require('./create-task')
const { getPaymentRequests, getPendingPayments } = require('./get-payment-requests')
const updatePublishedPayments = require('./update-published-payments')
const closeTask = require('./close-task')
const payAgreement = require('./pay-agreement')

module.exports = {
  createAgreement,
  getAgreements,
  getTasks,
  createTask,
  getPaymentRequests,
  closeTask,
  payAgreement,
  getPendingPayments,
  updatePublishedPayments
}
