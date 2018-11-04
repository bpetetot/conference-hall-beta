/* eslint-disable */
const path = require('path')

// load .env.local environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

module.exports = (on, config) => {
  // Get firebase configuration for cypress (if not already in env)
  if (!process.env.CYPRESS_APP_API_KEY) {
    config.env.APP_API_KEY = process.env.REACT_APP_API_KEY
  }
  if (!process.env.CYPRESS_APP_AUTH_DOMAIN) {
    config.env.APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
  }
  if (!process.env.CYPRESS_APP_PROJECT_ID) {
    config.env.APP_PROJECT_ID = process.env.REACT_APP_PROJECT_ID
  }

  return config
}
