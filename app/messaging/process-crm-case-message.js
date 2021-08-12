async function processCrmCase (message, receiver) {
  try {
    console.info('Received create crm case')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processCrmCase
