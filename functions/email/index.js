/* eslint-disable no-console */
const fetch = require('isomorphic-fetch')
const FormData = require('form-data')
const { isEmpty } = require('lodash')

module.exports.send = (config, {
  to = [], cc = [], bcc = [], subject, html, confName, webHookInfo,
}) => {
  if (!config || !config.key || !config.domain) {
    return Promise.reject(new Error('Mailgun configuration mailgun.key or mailgun.domain not found.'))
  }
  if (isEmpty(to) && isEmpty(cc) && isEmpty(bcc)) {
    return Promise.reject(new Error('No recipients given.'))
  }

  const { key, domain } = config

  const token = Buffer.from(`api:${key}`).toString('base64')
  const endpoint = `https://api.mailgun.net/v3/${domain}/messages`
  const from = `${confName} <no-reply@${domain}>`
  const form = new FormData()
  form.append('from', from)
  form.append('subject', subject)
  form.append('html', html)
  if (webHookInfo) {
    const keys = Object.keys(webHookInfo)
    for (let i = 0; i < keys.length; i += 1) {
      form.append(`v:${keys[i]}`, webHookInfo[keys[i]])
    }
  }
  to.forEach((dest) => {
    if (dest) form.append('to', dest)
  })
  bcc.forEach((dest) => {
    const bccEmail = !isEmpty(dest) && /\S+@\S+\.\S+/.test(dest) ? dest : null
    if (bccEmail) form.append('bcc', bccEmail)
  })
  cc.forEach((dest) => {
    const ccEmail = !isEmpty(dest) && /\S+@\S+\.\S+/.test(dest) ? dest : null
    if (ccEmail) form.append('cc', ccEmail)
  })

  console.info(`Send email "${subject}" to`, { to, cc, bcc })

  return fetch(endpoint, {
    headers: { Authorization: `Basic ${token}` },
    method: 'POST',
    body: form,
  })
}
