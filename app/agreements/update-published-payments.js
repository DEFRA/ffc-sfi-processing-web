const db = require('../data')

async function updatePublishedPayments (paymentRequestId) {
  await db.paymentRequest.update({ submitted: new Date() }, { where: { paymentRequestId } })
}

module.exports = updatePublishedPayments
