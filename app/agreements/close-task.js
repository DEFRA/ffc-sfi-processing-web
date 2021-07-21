const db = require('../data')

async function closeTask (taskId) {
  await db.task.update({ closedAt: new Date() }, { where: { taskId } })
}

module.exports = closeTask
