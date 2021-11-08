const sendMessage = require('./send-message')
const config = require('../config')
const { v4: uuidv4 } = require('uuid')
const { createAgreement } = require('../agreements')
const { createCrmCase } = require('../crm')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('Received submitted agreement', message.body)
    const validationCorrelationId = uuidv4()
    await createAgreement(message.body, validationCorrelationId)
    await sendMessage({ ...message.body }, 'uk.gov.sfi.agreement.validate', validationCorrelationId, config.validateTopic)
    console.info('Validation requested')
    await createCrmCase(message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
