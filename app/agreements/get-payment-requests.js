const db = require('../data')

const getPaymentRequests = async (agreementId, limit = 20, offset = 0) => {
  const where = agreementId ? { agreementId } : {}
  const { count, rows } = await db.paymentRequest.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true, // needed to ensure sequelize returns the correct count when includes used
    include: [{ model: db.agreement, as: 'agreement' }],
    order: [['createdAt', 'DESC'], ['submitted']]
  })
  return { paymentRequests: rows, total: count }
}

const getPendingPayments = async () => {
  return db.paymentRequest.findAll({
    where: { submitted: null },
    raw: true
  })
}

module.exports = {
  getPaymentRequests,
  getPendingPayments
}
