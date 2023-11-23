const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
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
      sourceSystem: 'SFIP',
      schemeId: 1,
      batch: undefined,
      deliveryBody: 'RP00',
      invoiceNumber: 'SFI0000001',
      frn: '1000000001',
      sbi: agreement.sbi,
      marketingYear: 2022,
      paymentRequestNumber: agreement.paymentRequests.length + 1,
      agreementNumber: agreement.agreementNumber,
      contractNumber: agreement.agreementData.contractNumber,
      paymentType: undefined,
      currency: 'GBP',
      schedule: 'Q4',
      dueDate: moment().format('DD[/]MM[/]YYYY'),
      value: agreement.agreementData.action.paymentAmount,
      correlationId: uuidv4(),
      invoiceLines: createInvoiceLines(agreement)
    }
  }
  await db.paymentRequest.create(paymentRequest)
  return true
}

const createInvoiceLines = (agreement) => {
  const invoiceLines = []
  const actions = agreement.agreementData.action
  delete actions.paymentAmount
  for (const funding in actions) {
    invoiceLines.push({
      schemeCode: '80101',
      accountCode: 'SOS273',
      fundCode: 'DRD10',
      agreementNumber: agreement.agreementNumber,
      description: 'G00 - Gross value of claim',
      value: actions[funding].paymentAmount,
      convergence: undefined,
      deliveryBody: 'RP00',
      marketingYear: 2022
    })
  }
  return invoiceLines
}

module.exports = payAgreement
