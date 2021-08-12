async function processCrmCloseCase (message, receiver) {
  try {
    console.info('Received close crm case')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processCrmCloseCase
