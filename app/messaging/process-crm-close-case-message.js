async function processCrmCloseCase (message, receiver) {
  try {
    console.info('Dynamics incident updated received', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processCrmCloseCase
