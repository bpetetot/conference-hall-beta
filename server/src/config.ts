import path from 'path'
import * as dotenv from 'dotenv'

const ENV = process.env.NODE_ENV || 'development'

if (ENV !== 'production') {
  const envFile = ENV === 'test' ? '.env.test' : '.env.dev'
  dotenv.config({ path: path.join(__dirname, '..', envFile) })
}

export default {
  ENV,
  PORT: process.env.PORT || 3001,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
}
