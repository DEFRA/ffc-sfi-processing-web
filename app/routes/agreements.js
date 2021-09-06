const Joi = require('joi')
const { getAgreements, payAgreement } = require('../agreements')
const azureAuth = require('../azure-auth')

module.exports = [
  {
    method: 'GET',
    path: '/agreements',
    handler: async (request, h) => {
      const agreements = await getAgreements()
      return h.view('agreements', {
        agreements,
        permissions: request.auth.credentials.permissions
      })
    }

  },
  {
    method: 'GET',
    path: '/agreement',
    handler: async (request, h) => {
      const agreements = await getAgreements(request.query.agreementId)
      return h.view('agreement', { agreements })
    }
  },
  {
    method: 'POST',
    path: '/agreement/pay',
    options: {
      validate: {
        payload: Joi.object({
          agreementId: Joi.number().required()
        }),
        failAction: async (request, h, error) => {
          const agreements = await getAgreements(request.payload.agreementId)
          return h.view('agreements', {
            agreements,
            permissions: request.auth.credentials.permissions,
            error: true
          }).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        // Before we do something important like approve payments we
        // could refresh our identity token to make sure the user still has the permissions
        try {
          const permissions = await azureAuth.refresh(request.auth.credentials.account, request.cookieAuth)

          if (!permissions.approvePayments) {
            const agreements = await getAgreements(request.payload.agreementId)
            return h.view('agreements', {
              agreements,
              permissions,
              error: true
            }).code(400).takeover()
          }
        } catch (err) {
          console.log('Failed to refresh authentication, logging user out')
          console.log(err)
          return h.redirect('/logout')
        }

        const readyToPay = await payAgreement(request.payload.agreementId)
        if (readyToPay) {
          return h.redirect(`/payment-requests?agreementId=${request.payload.agreementId}`)
        }

        const agreements = await getAgreements(request.payload.agreementId)
        return h.view('agreements', {
          agreements,
          permissions: request.auth.credentials.permissions,
          error: true
        }).code(400).takeover()
      }
    }
  }
]
