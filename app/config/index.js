const joi = require('joi')
const mqConfig = require('./mq-config')
const dbConfig = require('./db-config')

// Define config schema
const schema = joi.object({
  serviceName: joi.string().default('Agreement processing'),
  port: joi.number().default(3006),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  staticCacheTimeoutMillis: joi.number().default(7 * 24 * 60 * 60 * 1000),
  googleTagManagerKey: joi.string().default(''),
  paymentRequestPublishingInterval: joi.number().default(5000)
})

// Build config
const config = {
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS,
  googleTagManagerKey: process.env.GOOGLE_TAG_MANAGER_KEY,
  paymentRequestPublishingInterval: process.env.PAYMENT_REQUEST_PUBLISHING_INTERVAL
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

value.submitSubscription = mqConfig.submitSubscription
value.caseSubscription = mqConfig.caseSubscription
value.paymentTopic = mqConfig.paymentTopic
value.validateTopic = mqConfig.validateTopic
value.validationResponseSubscription = mqConfig.validationResponseSubscription
value.createCrmCaseTopic = mqConfig.createCrmCaseTopic
value.closeCrmCaseSubscription = mqConfig.closeCrmCaseSubscription

value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

value.dbConfig = dbConfig

module.exports = value
