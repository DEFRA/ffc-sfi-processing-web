const joi = require('joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string().default('localhost'),
    username: joi.string(),
    password: joi.string(),
    useCredentialChain: joi.bool().default(false),
    appInsights: joi.object()
  },
  submitSubscription: {
    name: joi.string(),
    address: joi.string(),
    topic: joi.string(),
    type: joi.string()
  },
  caseSubscription: {
    name: joi.string(),
    address: joi.string(),
    topic: joi.string(),
    type: joi.string()
  },
  paymentTopic: {
    name: joi.string(),
    address: joi.string(),
    type: joi.string()
  },
  validateTopic: {
    name: joi.string(),
    address: joi.string()
  },
  validationResponseSubscription: {
    name: joi.string(),
    address: joi.string(),
    topic: joi.string(),
    type: joi.string()
  },
  createCrmCaseTopic: {
    name: joi.string(),
    address: joi.string()
  },
  closeCrmCaseSubscription: {
    name: joi.string(),
    address: joi.string(),
    topic: joi.string(),
    type: joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === 'production',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
  },
  submitSubscription: {
    name: process.env.SUBMIT_SUBSCRIPTION_NAME,
    address: process.env.SUBMIT_SUBSCRIPTION_ADDRESS,
    topic: process.env.SUBMIT_TOPIC_ADDRESS,
    type: 'subscription'
  },
  caseSubscription: {
    name: process.env.CASE_SUBSCRIPTION_NAME,
    address: process.env.CASE_SUBSCRIPTION_ADDRESS,
    topic: process.env.CASE_TOPIC_ADDRESS,
    type: 'subscription'
  },
  paymentTopic: {
    name: process.env.PAYMENT_TOPIC_NAME,
    address: process.env.PAYMENT_TOPIC_ADDRESS
  },
  validateTopic: {
    name: process.env.VALIDATE_TOPIC_NAME,
    address: process.env.VALIDATE_TOPIC_ADDRESS
  },
  validationResponseSubscription: {
    name: process.env.VALIDATION_SUBSCRIPTION_NAME,
    address: process.env.VALIDATION_SUBSCRIPTION_ADDRESS,
    topic: process.env.VALIDATION_TOPIC_ADDRESS,
    type: 'subscription'
  },
  createCrmCaseTopic: {
    name: process.env.CRMCASE_TOPIC_NAME,
    address: process.env.CRMCASE_TOPIC_ADDRESS
  },
  closeCrmCaseSubscription: {
    name: process.env.CLOSECRMCASE_SUBSCRIPTION_NAME,
    address: process.env.CLOSECRMCASE_SUBSCRIPTION_ADDRESS,
    topic: process.env.CLOSECRMCASE_TOPIC_ADDRESS,
    type: 'subscription'
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}
const submitSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.submitSubscription }
const caseSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.caseSubscription }
const paymentTopic = { ...mqResult.value.messageQueue, ...mqResult.value.paymentTopic }
const validateTopic = { ...mqResult.value.messageQueue, ...mqResult.value.validateTopic }
const validationResponseSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.validationResponseSubscription }
const createCrmCaseTopic = { ...mqResult.value.messageQueue, ...mqResult.value.createCrmCaseTopic }
const closeCrmCaseSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.closeCrmCaseSubscription }

module.exports = {
  submitSubscription,
  caseSubscription,
  paymentTopic,
  validateTopic,
  validationResponseSubscription,
  createCrmCaseTopic,
  closeCrmCaseSubscription
}
