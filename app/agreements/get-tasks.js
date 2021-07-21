const db = require('../data')

async function getTasks (agreementId) {
  return db.task.findAll({
    where: { agreementId },
    include: [{ model: db.status, as: 'status' }, { model: db.agreement, as: 'agreement' }, { model: db.taskType, as: 'taskType' }],
    order: [['createdAt', 'DESC']]
  })
}

module.exports = getTasks
