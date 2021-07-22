const db = require('../data')
const createTask = require('./create-task')

async function processValidationResponse (validationResponse, validationCorrelationId) {
  await db.task.update({ closedAt: new Date(), statusId: 4 }, { where: { correlationId: validationCorrelationId, closedAt: null } })

  if (validationResponse.warnings) {
    for (const warning of validationResponse.warnings) {
      await createTask(validationResponse.agreementNumber, warning.type)
    }
  }
}

module.exports = processValidationResponse
