const db = require('../data')

const getAgreements = async (agreementId, limit = 20, offset = 0) => {
  const where = agreementId ? { agreementId } : {}
  const { count, rows } = await db.agreement.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true, // needed to ensure sequelize returns the correct count when includes used
    include: [{ model: db.task, as: 'tasks', include: { model: db.status, as: 'status' } }, { model: db.paymentRequest, as: 'paymentRequests' }],
    order: [['createdAt', 'DESC']]
  })
  return { agreements: rows, total: count }
}

module.exports = getAgreements
