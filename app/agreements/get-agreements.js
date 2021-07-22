const db = require('../data')

async function getAgreements (agreementId) {
  const where = agreementId ? { agreementId } : {}
  return db.agreement.findAll({
    where,
    include: [{ model: db.task, as: 'tasks', include: { model: db.status, as: 'status' } }, { model: db.paymentRequest, as: 'paymentRequests' }],
    order: [['createdAt', 'DESC']]
  })
}

module.exports = getAgreements
