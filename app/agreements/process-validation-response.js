const db = require('../data')
const createTask = require('./create-task')

async function processValidationResponse (validationResponse, validationCorrelationId) {
  const warnings = validationResponse.warnings

  if (!warnings.length) {
    await db.task.update({ closedAt: new Date(), statusId: 4 }, { where: { correlationId: validationCorrelationId, closedAt: null } })
  } else {
    for (const warning of warnings) {
      await createTask(validationResponse.agreementNumber, warning.type)
    }
  }
}

module.exports = processValidationResponse
