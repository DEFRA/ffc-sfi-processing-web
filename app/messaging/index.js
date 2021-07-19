const config = require('../config')
const processMessage = require('./process-message')
const { MessageReceiver } = require('ffc-messaging')
let submitReceiver
let caseReceiver

async function start () {
  const submitAction = message => processMessage(message, submitReceiver)
  submitReceiver = new MessageReceiver(config.submitSubscription, submitAction)
  await submitReceiver.subscribe()

  const caseAction = message => processMessage(message, caseReceiver)
  caseReceiver = new MessageReceiver(config.caseSubscription, caseAction)
  await caseReceiver.subscribe()

  console.info('Ready to receive messages')
}

async function stop () {
  await submitReceiver.closeConnection()
  await caseReceiver.closeConnection()
}

module.exports = { start, stop }
