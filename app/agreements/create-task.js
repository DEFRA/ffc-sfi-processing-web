const db = require('../data')

async function createTask (agreementNumber, taskTypeName) {
  const taskType = await db.taskType.findOne({ where: { name: taskTypeName } })
  if (!taskType) {
    throw Error(`Unidentified task type: ${taskTypeName}`)
  }

  const transaction = await db.sequelize.transaction()
  try {
    const existingAgreement = await db.agreement.findOne({ where: { agreementNumber }, transaction })
    if (!existingAgreement) {
      throw Error(`No submitted agreement exists for ${agreementNumber}`)
    }
    const existingTask = await db.task.findOne({ where: { taskTypeId: taskType.taskTypeId, agreementId: existingAgreement.agreementId }, transaction })

    if (!existingTask) {
      await db.task.create({ taskTypeId: taskType.taskTypeId, agreementId: existingAgreement.agreementId }, { transaction })
    } else {
      console.info(`Duplicate task creation request received: ${agreementNumber} - ${taskTypeName}`)
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

module.exports = createTask
