async function processCaseMessage (message, receiver) {
  try {
    console.info('Received agreement case')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processCaseMessage
