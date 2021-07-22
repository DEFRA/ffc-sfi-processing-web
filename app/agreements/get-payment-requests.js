const db = require('../data')

async function getPaymentRequests (agreementId) {
  const where = agreementId ? { agreementId } : {}
  return db.paymentRequest.findAll({
    where,
    include: [{ model: db.agreement, as: 'agreement' }],
    order: [['createdAt', 'DESC'], ['submitted']]
  })
}

module.exports = getPaymentRequests
