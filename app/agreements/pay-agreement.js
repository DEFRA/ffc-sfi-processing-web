const db = require('../data')
const moment = require('moment')

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
      sourceSystem: 'SFIP',
      sbi: agreement.sbi,
      marketingYear: 2022,
      paymentRequestNumber: agreement.paymentRequests.length + 1,
      agreementNumber: agreement.agreementNumber,
      contractNumber: agreement.agreementData.contractNumber,
      currency: 'GBP',
      schedule: 'M12',
      dueDate: moment().format('DD[/]MM[/]YYYY'),
      value: agreement.agreementData.paymentAmount,
      invoiceLines: createInvoiceLines(agreement.agreementData.standards)
    }
  }
  await db.paymentRequest.create(paymentRequest)
  return true
}

const createInvoiceLines = (standards) => {
  return standards.map(x => ({
    standardCode: x.id,
    description: 'G00 - Gross value of claim',
    value: x.paymentAmount
  }))
}

module.exports = payAgreement
