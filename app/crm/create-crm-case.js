const publishCrmCase = require('../messaging/publish-crm-case')
const { MessageSender } = require('ffc-messaging')
const config = require('../config')

const createCrmCase = async (crmCase) => {
  const crmCaseSender = new MessageSender(config.createCrmCaseTopic)
  await publishCrmCase(crmCase, crmCaseSender)
  console.info(`CRM Create Case Sent: ${crmCase.agreementNumber}`)
}

module.exports = createCrmCase
