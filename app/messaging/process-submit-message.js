const sendMessage = require('./send-message')
const config = require('../config')
const { v4: uuidv4 } = require('uuid')
const { createAgreement } = require('../agreements')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('Received submitted agreement')
    const validationCorrelationId = uuidv4()
    await createAgreement(message.body, validationCorrelationId)
    await sendMessage({ sbi: message.body.sbi }, 'uk.gov.sfi.agreement.validate', validationCorrelationId, config.validateTopic)
    console.info('Validation requested')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
