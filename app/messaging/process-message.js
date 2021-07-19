async function processPaymentMessage (message, receiver) {
  try {
    console.info('Received agreement update')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processPaymentMessage
