/* eslint-disable no-console */
const fetch = require('isomorphic-fetch')
const FormData = require('form-data')
const { isEmpty } = require('lodash')

module.exports.send = (config, {
  to, contact, subject, html, confName,
}) => {
  if (!config || !config.key || !config.domain) {
    return Promise.reject(new Error('Mailgun configuration mailgun.key or mailgun.domain not found.'))
  }
  if (!to || to.filter(t => !!t).length === 0) {
    return Promise.reject(new Error('No destination email given.'))
  }

  const { key, domain } = config

  const token = Buffer.from(`api:${key}`).toString('base64')
  const endpoint = `https://api.mailgun.net/v3/${domain}/messages`
  const from = `${confName} <no-reply@${domain}>`

  const form = new FormData()
  form.append('from', from)
  form.append('subject', subject)
  form.append('html', html)
  to.forEach((dest) => {
    if (dest) form.append('to', dest)
  })
  const cc = !isEmpty(contact) && /\S+@\S+\.\S+/.test(contact) ? contact : null
  if (cc) {
    form.append('cc', cc)
  }
  return fetch(endpoint, {
    headers: { Authorization: `Basic ${token}` },
    method: 'POST',
    body: form,
  })
}
