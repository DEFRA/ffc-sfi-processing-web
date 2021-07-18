const config = require('../config')
const processCaseMessage = require('./process-case-message')
const processSubmitMessage = require('./process-submit-message')
const processValidationMessage = require('./process-validation-message')
const { MessageReceiver } = require('ffc-messaging')
let submitReceiver
let caseReceiver
let validationReceiver

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

  console.info('Ready to receive messages')
}

async function stop () {
  await submitReceiver.closeConnection()
  await caseReceiver.closeConnection()
  await validationReceiver.closeConnection()
}

module.exports = { start, stop }
