import path from 'path'
import * as dotenv from 'dotenv'

const ENV = process.env.NODE_ENV || 'development'

if (ENV !== 'production') {
  const envFile = ENV === 'test' ? '.env.test' : '.env.dev'
  dotenv.config({ path: path.join(__dirname, '..', envFile) })
}

class Config {
  ENV: string
  PORT: number
  WEBAPP_DOMAIN?: string
  FIREBASE_PROJECT_ID?: string
  FIREBASE_PRIVATE_KEY?: string
  FIREBASE_CLIENT_EMAIL?: string
  MAILGUN_DOMAIN: string
  MAILGUN_API_KEY: string
  MAILHOG_HOST: string
  MAILHOG_PORT: number

  constructor() {
    this.ENV = ENV
    this.PORT = Number(process.env.PORT) || 3001
    this.WEBAPP_DOMAIN = process.env.WEBAPP_DOMAIN
    this.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
    this.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    this.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
    this.MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
    this.MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || ''
    this.MAILHOG_HOST = 'localhost'
    this.MAILHOG_PORT = 1025
  }

  get isProduction(): boolean {
    return this.ENV === 'production'
  }

  get isDevelopment(): boolean {
    return this.ENV === 'development'
  }

  get isTest(): boolean {
    return this.ENV === 'test'
  }

  get isMailgunEnabled(): boolean {
    return !!this.MAILGUN_API_KEY && !!this.MAILGUN_DOMAIN
  }
}

export default new Config()
