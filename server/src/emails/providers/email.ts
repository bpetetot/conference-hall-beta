import { MailhogProvider } from './mailhog'
import { MailgunProvider } from './mailgun'

import config from '../../config'

export type Email = {
  from: string
  to: Array<string>
  cc?: Array<string>
  bcc?: Array<string>
  subject: string
  html: string
}

export type ProviderVariables = {
  [key: string]: string
}

export type RecipientVariables = {
  [email: string]: {
    [custom: string]: string
  }
}

export interface IEmailProvider {
  sendEmail(email: Email, providerVariables?: ProviderVariables): Promise<void>

  sendCustomEmail(
    email: Email,
    providerVariables?: ProviderVariables,
    recipientVariables?: RecipientVariables,
  ): Promise<void>
}

export function getEmailProvider(): IEmailProvider {
  if (config.isProduction) {
    return new MailgunProvider()
  }
  return new MailhogProvider()
}
