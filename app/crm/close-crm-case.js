const publishCrmCloseCase = require('../messaging/publish-crm-close-case')
const { MessageSender } = require('ffc-messaging')
const config = require('../config')

const closeCrmCase = async (crmCloseCase) => {
  const crmCloseCaseSender = new MessageSender(config.closeCrmCaseTopic)
  publishCrmCloseCase(crmCloseCase, crmCloseCaseSender)
  console.info(`CRM Close Case Sent: ${crmCloseCase}`)
}

module.exports = closeCrmCase
