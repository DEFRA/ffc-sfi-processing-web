const db = require('../data')

async function payAgreement (agreementId) {
  const agreement = await db.agreement.findOne({
    where: { agreementId },
    include: [{ model: db.task, as: 'tasks' }, { model: db.paymentRequest, as: 'paymentRequests' }]
  })
  const hasOpenTasks = agreement.tasks.some(x => x.closedAt === null)
  if (hasOpenTasks) {
    return false
  }
  const paymentRequest = {
    agreementId: agreement.agreementId,
    calculationData: {
      paymentRequestNumber: agreement.paymentRequests.length + 1,
      paymentAmount: agreement.agreementData.paymentAmount
    }
  }
  await db.paymentRequest.create(paymentRequest)
  return true
}

module.exports = payAgreement
