function createMessage (body, type, correlationId) {
  return {
    body,
    type,
    source: 'ffc-sfi-processing-web',
    correlationId
  }
}

module.exports = createMessage
