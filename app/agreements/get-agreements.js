const db = require('../data')

async function getAgreements () {
  return await db.agreement.findAll({
    include: [{ model: db.task, as: 'tasks', include: { model: db.status, as: 'status' } }, { model: db.paymentRequest, as: 'paymentRequests' }],
    order: [['createdAt', 'DESC']]
  })
}

module.exports = getAgreements
