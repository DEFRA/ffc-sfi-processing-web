const createMessage = require('./create-message')
const { getPendingPayments, updatePublishedPayments } = require('../agreements')

async function publishPendingPayments (paymentSender) {
  const payments = await getPendingPayments()
  for (const payment of payments) {
    await publishPayment(payment, paymentSender)
  }
}

async function publishPayment (payment, paymentSender) {
  try {
    const message = createMessage(payment.calculationData, 'uk.gov.sfi.payment.request')
    await paymentSender.sendMessage(message)
    await updatePublishedPayments(payment.paymentRequestId)
  } catch (err) {
    console.error('Unable to publish payment request: ', err)
  }
}

module.exports = publishPendingPayments
