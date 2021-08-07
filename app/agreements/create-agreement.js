const db = require('../data')
const createContract = require('./create-contract')
const highValuePaymentThreshold = 5000

async function createAgreement (agreement, validationCorrelationId) {
  const transaction = await db.sequelize.transaction()
  try {
    const existingAgreement = await db.agreement.findOne({ where: { agreementNumber: agreement.agreementNumber }, transaction })
    if (!existingAgreement) {
      agreement.contractNumber = createContract(agreement.agreementNumber)
      const createdAgreement = await db.agreement.create({ agreementNumber: agreement.agreementNumber, sbi: agreement.sbi, agreementData: agreement }, { transaction })
      await db.task.create({ taskTypeId: 1, agreementId: createdAgreement.agreementId, correlationId: validationCorrelationId }, { transaction })
      if (agreement.paymentAmount > highValuePaymentThreshold) {
        await db.task.create({ taskTypeId: 4, agreementId: createdAgreement.agreementId }, { transaction })
      }
    } else {
      console.info(`Duplicate submitted agreement received: ${agreement.agreementNumber}`)
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

module.exports = createAgreement
