const { processValidationResponse } = require('../agreements')

async function processValidationMessage (message, receiver) {
  try {
    console.info('Received validation result')
    await processValidationResponse(message.body, message.correlationId)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processValidationMessage
