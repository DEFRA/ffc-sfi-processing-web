async function processValidationMessage (message, receiver) {
  try {
    console.info('Received validation case')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processValidationMessage
