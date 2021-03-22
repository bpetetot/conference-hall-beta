/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch'
import FormData from 'form-data'
import config from '../config'

const KEY = config.MAILGUN_API_KEY
const DOMAIN = config.MAILGUN_DOMAIN

export type SendData = {
  from: string
  to: (string | null)[]
  cc?: (string | null)[]
  bcc?: (string | null)[]
  subject: string
  html: string
  'mailgun-variables'?: MailgunVariables
  'recipient-variables'?: RecipientVariables
}

export type MailgunVariables = { [variable: string]: any }

export type RecipientVariables = { [email: string]: { [variable: string]: any } }

function isEmail(email: string | null) {
  if (!email) return false
  return /\S+@\S+\.\S+/.test(email)
}

function appendEmails(formData: FormData, name: string, emails?: (string | null)[]) {
  emails?.forEach((email) => {
    if (isEmail(email)) formData.append(name, email)
  })
}

function appendMailgunVariables(formData: FormData, variables?: MailgunVariables) {
  if (!variables) return
  Object.keys(variables).forEach((key) => formData.append(key, variables[key]))
}

function appendRecipientVariables(formData: FormData, variables?: RecipientVariables) {
  if (!variables) return
  formData.append('recipient-variables', JSON.stringify(variables))
}

function toFormData(data: SendData) {
  const formData = new FormData()

  formData.append('from', data.from)
  formData.append('subject', data.subject)
  formData.append('html', data.html)

  appendEmails(formData, 'to', data.to)
  appendEmails(formData, 'cc', data.cc)
  appendEmails(formData, 'bcc', data.bcc)

  appendMailgunVariables(formData, data['mailgun-variables'])
  appendRecipientVariables(formData, data['recipient-variables'])

  return formData
}

export function isEmailServiceEnabled() {
  return Boolean(KEY && DOMAIN)
}

export async function sendEmail(data: SendData) {
  if (!isEmailServiceEnabled()) return
  try {
    const token = Buffer.from(`api:${KEY}`).toString('base64')
    const endpoint = `https://api.mailgun.net/v3/${DOMAIN}/messages`

    await fetch(endpoint, {
      headers: { Authorization: `Basic ${token}` },
      method: 'POST',
      body: toFormData(data),
    })
  } catch (error) {
    console.error(`Error sending email: ${error}`)
  }
}
