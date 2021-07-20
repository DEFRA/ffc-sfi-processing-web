const db = require('../data')

async function getAgreements () {
  return db.agreement.findAll({
    include: [{ model: db.task, as: 'tasks', include: { model: db.status, as: 'status' } }, { model: db.paymentRequest, as: 'paymentRequests' }],
    order: [['createdAt', 'DESC']],
    raw: true,
    nest: true
  })
}

module.exports = getAgreements
