/* eslint-disable no-param-reassign */
const path = require('path')
const cypressFirebasePlugin = require('cypress-firebase').plugin

// load .env.local environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

module.exports = (on, config) => {
  // Get Firebase configuration for Cypress
  config.env.APP_API_KEY = process.env.REACT_APP_API_KEY
  config.env.APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
  config.env.APP_PROJECT_ID = process.env.REACT_APP_PROJECT_ID

  return cypressFirebasePlugin(config)
}
