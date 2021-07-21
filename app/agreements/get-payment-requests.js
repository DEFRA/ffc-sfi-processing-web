const db = require('../data')

async function getPaymentRequests (agreementId) {
  return db.paymentRequest.findAll({
    where: { agreementId },
    order: [['createdAt', 'DESC'], ['submitted']]
  })
}

module.exports = getPaymentRequests
