import IntlMessageFormat from 'intl-messageformat'

const messages = {
  proposals: `{count, plural,
    =0 {No proposals}
    one {1 proposal}
    other {{count} proposals}
  }`,
  emails: `You are going to send {count, plural,
    =0 {no emails}
    one {1 email}
    other {{count} emails}
  }. Continue?`,
}

export default (key, values) => {
  const msg = new IntlMessageFormat(messages[key])
  return msg.format(values)
}
