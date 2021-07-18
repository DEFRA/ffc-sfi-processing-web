const sendMessage = require('./send-message')
const config = require('../config')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('Received submitted agreement')
    await sendMessage(message.body, 'uk.gov.sfi.agreement.validate', message.correlationId, config.validateTopic)
    console.info('Validation requested')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
