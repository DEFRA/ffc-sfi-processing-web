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
      invoiceNumber: '',
      frn: '',
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
      invoiceLines: createInvoiceLines(agreement.agreementData.action)
    }
  }
  await db.paymentRequest.create(paymentRequest)
  return true
}

const createInvoiceLines = (action) => {
  const invoiceLines = []
  for (const funding in action) {
    invoiceLines.push({
      schemeCode: action[funding].code,
      accountCode: '',
      fundCode: '',
      agreementNumber: '',
      description: 'G00 - Gross value of claim',
      value: action[funding].paymentAmount,
      convergence: undefined,
      deliveryBody: '',
      marketingYear: ''
    })
  }
  return invoiceLines
}

module.exports = payAgreement
