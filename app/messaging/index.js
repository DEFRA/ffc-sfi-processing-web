const config = require('../config')
const processCaseMessage = require('./process-case-message')
const processSubmitMessage = require('./process-submit-message')
const processValidationMessage = require('./process-validation-message')
const processCrmCloseCase = require('./process-crm-close-case-message')
const publishPendingPayments = require('./publish-pending-payments')
const { MessageReceiver, MessageSender } = require('ffc-messaging')
let submitReceiver
let caseReceiver
let validationReceiver
let crmCloseCaseReceiver
let paymentSender

async function start () {
  const submitAction = message => processSubmitMessage(message, submitReceiver)
  submitReceiver = new MessageReceiver(config.submitSubscription, submitAction)
  await submitReceiver.subscribe()

  const caseAction = message => processCaseMessage(message, caseReceiver)
  caseReceiver = new MessageReceiver(config.caseSubscription, caseAction)
  await caseReceiver.subscribe()

  const validationAction = message => processValidationMessage(message, validationReceiver)
  validationReceiver = new MessageReceiver(config.validationResponseSubscription, validationAction)
  await validationReceiver.subscribe()

  const crmCaseCloseAction = message => processCrmCloseCase(message, crmCloseCaseReceiver)
  crmCloseCaseReceiver = new MessageReceiver(config.closeCrmCaseSubscription, crmCaseCloseAction)
  await crmCloseCaseReceiver.subscribe()

  console.info('Ready to receive messages')

  paymentSender = new MessageSender(config.paymentTopic)
  setInterval(() => publishPendingPayments(paymentSender), config.paymentRequestPublishingInterval)
  console.info('Ready to publish payments')
}

async function stop () {
  await submitReceiver.closeConnection()
  await caseReceiver.closeConnection()
  await validationReceiver.closeConnection()
  await crmCloseCaseReceiver.closeConnection()
  await paymentSender.closeConnection()
}

module.exports = { start, stop }
