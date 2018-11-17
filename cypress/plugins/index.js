const path = require('path')

// load .env.local environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

module.exports = (on, config) => {
  // Get Firebase configuration for Cypress
  config.env.APP_API_KEY = process.env.CYPRESS_APP_API_KEY
  config.env.APP_AUTH_DOMAIN = process.env.CYPRESS_APP_AUTH_DOMAIN
  config.env.APP_PROJECT_ID = process.env.CYPRESS_APP_PROJECT_ID
  config.env.APP_TOKEN = process.env.CYPRESS_APP_TOKEN

  return config
}
