const { createTask } = require('../agreements')

async function processCaseMessage (message, receiver) {
  try {
    console.info('Received agreement case')
    await createTask(message.body.agreementNumber, message.body.taskType)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processCaseMessage
