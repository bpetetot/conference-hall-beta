import IntlMessageFormat from 'intl-messageformat'

const messages = {
  event: `{itemCount, plural,
    =0 {No events}
    one {1 event}
    other {{itemCount} events}
  }`,
  meetup: `{itemCount, plural,
    =0 {No meetups}
    one {1 meetup}
    other {{itemCount} meetups}
  }`,
  conference: `{itemCount, plural,
    =0 {No conferences}
    one {1 conference}
    other {{itemCount} conferences}
  }`,
}

export default (key, values) => {
  const msg = new IntlMessageFormat(messages[key])
  return msg.format(values)
}
