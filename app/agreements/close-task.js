const db = require('../data')

async function closeTask (taskId) {
  await db.task.update({ closedAt: new Date(), statusId: 4 }, { where: { taskId } })
}

module.exports = closeTask
