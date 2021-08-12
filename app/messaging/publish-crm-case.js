const createMessage = require('./create-message')

async function publishCrmCase (crmCase, crmCaseSender) {
  try {
    const message = createMessage(crmCase, 'uk.gov.sfi.crm.case.request')
    await crmCaseSender.sendMessage(message)
  } catch (err) {
    console.error('Unable to publish crm case request: ', err)
  }
}

module.exports = publishCrmCase
