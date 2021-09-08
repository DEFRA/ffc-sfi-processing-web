const db = require('../data')

const getTasks = async (agreementId, limit = 20, offset = 0) => {
  const where = agreementId ? { agreementId } : {}
  const { count, rows } = await db.task.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true, // needed to ensure sequelize returns the correct count when includes used
    include: [{ model: db.status, as: 'status' }, { model: db.agreement, as: 'agreement' }, { model: db.taskType, as: 'taskType' }],
    order: [['createdAt', 'DESC']]
  })
  return { tasks: rows, total: count }
}

module.exports = getTasks
