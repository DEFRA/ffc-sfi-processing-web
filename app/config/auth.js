const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  azure: Joi.object({
    clientSecret: Joi.string().required(),
    clientId: Joi.string().required(),
    tenantId: Joi.string().required()
  }),
  cookie: Joi.object({
    password: Joi.string().default('this_is_not_a_real_password_this_is_not_a_real_password'),
    ttl: Joi.number().default(60 * 60 * 1000)
  })
})

// Build config
const config = {
  azure: {
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    clientId: process.env.AZURE_CLIENT_ID,
    tenantId: process.env.AZURE_TENANT_ID
  },
  cookie: {
    password: process.env.COOKIE_PASSWORD,
    ttl: process.env.COOKIE_TTL
  }
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The auth config is invalid. ${result.error.message}`)
}

module.exports = result.value
