import IntlMessageFormat from 'intl-messageformat'

const messages = {
  proposals: `{count, plural,
    =0 {No proposals}
    one {1 proposal}
    other {{count} proposals}
  }`,
  emails: `{count, plural,
    =0 {no {type} emails}
    one {1 {type} email}
    other {{count} {type} emails}
  }`,
}

export default (key, values) => {
  const msg = new IntlMessageFormat(messages[key])
  return msg.format(values)
}
