/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch'
import FormData from 'form-data'
import config from '../../config'
import { RecipientVariables, Email, IEmailProvider, ProviderVariables } from './email'

const KEY = config.MAILGUN_API_KEY
const DOMAIN = config.MAILGUN_DOMAIN

export class MailgunProvider implements IEmailProvider {
  endpoint = `https://api.mailgun.net/v3/${DOMAIN}/messages`
  token = Buffer.from(`api:${KEY}`).toString('base64')

  async sendEmail(data: Email, providerVariables?: ProviderVariables) {
    const body = toFormData(data, providerVariables)
    return this._send(body)
  }

  async sendCustomEmail(
    data: Email,
    providerVariables?: ProviderVariables,
    recipentVariables?: RecipientVariables,
  ) {
    const body = toFormData(data, providerVariables, recipentVariables)
    return this._send(body)
  }

  async _send(body: FormData) {
    if (!config.isMailgunEnabled) return
    try {
      await fetch(this.endpoint, {
        headers: { Authorization: `Basic ${this.token}` },
        method: 'POST',
        body,
      })
    } catch (error) {
      console.error(`Error sending email: ${error}`)
    }
  }
}

function isEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

function appendEmails(formData: FormData, name: string, emails?: string[]) {
  emails?.forEach((email) => {
    if (isEmail(email)) formData.append(name, email)
  })
}

function toFormData(
  data: Email,
  providerVariables: ProviderVariables = {},
  recipentVariables: RecipientVariables = {},
) {
  const formData = new FormData()

  appendEmails(formData, 'to', data.to)
  appendEmails(formData, 'cc', data.cc)
  appendEmails(formData, 'bcc', data.bcc)

  formData.append('from', data.from)
  formData.append('subject', data.subject)
  formData.append('html', data.html)

  Object.keys(providerVariables).forEach((key) => formData.append(key, providerVariables[key]))

  formData.append('recipient-variables', JSON.stringify(recipentVariables))

  return formData
}
