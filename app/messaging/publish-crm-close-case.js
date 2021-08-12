const createMessage = require('./create-message')

async function publishCrmCloseCase (crmCloseCase, crmCloseCaseSender) {
  try {
    const message = createMessage(crmCloseCase, 'uk.gov.sfi.crm.close.case.request')
    await crmCloseCaseSender.sendMessage(message)
  } catch (err) {
    console.error('Unable to publish crm close case request: ', err)
  }
}

module.exports = publishCrmCloseCase
