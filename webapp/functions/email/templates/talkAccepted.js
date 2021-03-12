module.exports = (event, users, talk, app) => `
<html>
<head>
  <script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "EmailMessage",
  "potentialAction": {
    "@type": "ConfirmAction",
    "name": "Confirm presence",
    "handler": {
      "@type": "HttpActionHandler",
      "url": "${app.gcf_url}/rsvp?eventId=${event.id}&amp;talkId=${talk.id}&amp;value=yes"
    }
  },
  "description": "Reply to Conference-Hall for speaker presence to the event"
}
</script>
</head>
<body>
  <p>Dear ${users.map(user => user.displayName).join(', ')},</p>
  <p>Your talk <strong>"${talk.title}"</strong> at <strong>"${event.name}"</strong> has been accepted! 🎉  🎊</p>
  <p>In order to help organizers for the selection and the event management, please confirm your participation:<p>
  <ul>
  <li><strong><a href="${app.url}/speaker/talk/${talk.id}">My talk <strong>${talk.title}<strong></a></li></strong>
  </p>
  <p>
  See you there!
  </p>
  <p>
  Made with 💗 by <a href="${app.url}">conference-hall.io</a> – <i>"${event.name}" team</i>
  </p>
  </body>
</html>
`
