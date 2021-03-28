import fetch from 'node-fetch'
import { sendEmail } from './mailgun'

const fetchMock = <jest.Mock>(fetch as unknown)

jest.mock('../config', () => ({
  __esModule: true,
  default: { MAILGUN_API_KEY: 'KEY', MAILGUN_DOMAIN: 'DOMAIN' },
}))

describe('mailgun', () => {
  it('should send an email with all parameters', async () => {
    // when
    await sendEmail({
      from: 'from@example.net',
      to: ['to1@example.net', 'to2@example.net'],
      cc: ['cc1@example.net', 'cc2@example.net'],
      bcc: ['bcc1@example.net', 'bcc2@example.net'],
      subject: 'subject',
      html: 'html',
      'mailgun-variables': { 'v:var1': 'variable1', 'v:var2': 'variable2' },
      'recipient-variables': { email1: { var1: 'user-variable1' } },
    })

    // then
    const url = fetchMock.mock.calls[0][0]
    const args = fetchMock.mock.calls[0][1]
    expect(url).toEqual('https://api.mailgun.net/v3/DOMAIN/messages')
    expect(args.method).toEqual('POST')
    expect(args.body._streams).toContain('from@example.net')
    expect(args.body._streams).toContain('to1@example.net')
    expect(args.body._streams).toContain('to2@example.net')
    expect(args.body._streams).toContain('cc1@example.net')
    expect(args.body._streams).toContain('cc2@example.net')
    expect(args.body._streams).toContain('bcc1@example.net')
    expect(args.body._streams).toContain('bcc2@example.net')
    expect(args.body._streams).toContain('subject')
    expect(args.body._streams).toContain('html')
    expect(args.body._streams).toContain('variable1')
    expect(args.body._streams).toContain('variable2')
    expect(args.body._streams).toContain(JSON.stringify({ email1: { var1: 'user-variable1' } }))
  })

  it('should send only valid email', async () => {
    // when
    await sendEmail({
      from: 'from@example.net',
      to: ['to1@example.net', 'invalid', null],
      cc: ['invalid'],
      bcc: ['invalid'],
      subject: 'subject',
      html: 'html',
    })

    // then
    const args = fetchMock.mock.calls[0][1]
    expect(args.method).toEqual('POST')
    expect(args.body._streams).not.toContain('invalid')
  })
})
