const sendMessage = require('./send-message')
const config = require('../config')
const { v4: uuidv4 } = require('uuid')
const { createAgreement } = require('../agreements')
const { createCrmCase } = require('../crm')
const util = require('util')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('Received submitted agreement', util.inspect(message.body))
    const validationCorrelationId = uuidv4()
    await createAgreement(message.body, validationCorrelationId)
    await sendMessage({ ...message.body }, 'uk.gov.sfi.agreement.validate', validationCorrelationId, config.validateTopic)
    console.info(`Validation requested for ${message.body.agreementNumber}`)
    await createCrmCase({
      scheme: 'sfi',
      sbi: message.body.sbi,
      agreementNumber: message.body.agreementNumber,
      incidentTypeId: 'validation',
      description: 'Agreement validation requested'
    })
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
