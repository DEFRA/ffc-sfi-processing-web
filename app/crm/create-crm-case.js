const publishCrmCase = require('../messaging/publish-crm-case')
const { MessageSender } = require('ffc-messaging')
const config = require('../config')

const createCrmCase = async (crmCase, validationCorrelationId) => {
  const crmCaseSender = new MessageSender(config.createCrmCaseTopic)
  publishCrmCase(crmCase, crmCaseSender)
  console.info(`CRM Create Case Sent: ${crmCase}`)
}

module.exports = createCrmCase
