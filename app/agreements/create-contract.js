const createContract = (agreementNumber) => {
  return `SIP${agreementNumber.slice(-6)}`
}

module.exports = createContract
