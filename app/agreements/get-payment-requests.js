const db = require('../data')

async function getPaymentRequests (agreementId) {
  const where = agreementId ? { agreementId } : {}
  return db.paymentRequest.findAll({
    where,
    include: [{ model: db.agreement, as: 'agreement' }],
    order: [['createdAt', 'DESC'], ['submitted']]
  })
}

async function getPendingPayments () {
  return db.paymentRequest.findAll({
    where: { submitted: null },
    raw: true
  })
}

module.exports = {
  getPaymentRequests,
  getPendingPayments
}
