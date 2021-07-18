const config = require('../config')
const processCaseMessage = require('./process-case-message')
const processSubmitMessage = require('./process-submit-message')
const { MessageReceiver } = require('ffc-messaging')
let submitReceiver
let caseReceiver

async function start () {
  const submitAction = message => processSubmitMessage(message, submitReceiver)
  submitReceiver = new MessageReceiver(config.submitSubscription, submitAction)
  await submitReceiver.subscribe()

  const caseAction = message => processCaseMessage(message, caseReceiver)
  caseReceiver = new MessageReceiver(config.caseSubscription, caseAction)
  await caseReceiver.subscribe()

  console.info('Ready to receive messages')
}

async function stop () {
  await submitReceiver.closeConnection()
  await caseReceiver.closeConnection()
}

module.exports = { start, stop }
