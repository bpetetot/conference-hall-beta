import { Event, Proposal } from '@prisma/client'
import config from '../config'

const appUrl = config.WEBAPP_DOMAIN

export const proposalSubmitted = (event: Event, proposal: Proposal) => `
<html>
<head>
  <title>Submission confirmed</title>
</head>
<body>
  <p>Your talk <strong>"${proposal.title}"</strong> has been successfully submitted.</p>
  <p>In order to help organizers select and manage the event, please don't forget to fill:<p>
  <ul>
  <li><strong><a href="${appUrl}/speaker/profile">Your profile</a></strong></li>
  ${
    event.surveyEnabled
      ? `<li><strong><a href="${appUrl}/speaker/event/${event.id}/survey">The speaker survey</a></strong></li>`
      : ''
  }
  </ul>
  <p>You will soon be informed if your talk has been selected or not.</p>
  <p>Thanks!</p>
  <p>Made with 💗 by <a href="${appUrl}">conference-hall.io</a> – <i>"${event.name}" team</i></p>
</body>
</html>
`

export const proposalReceived = (event: Event, proposal: Proposal) => `
<html>
<head>
  <title>New proposal</title>
</head>
<body>
  <p>✨ The talk <strong>"${proposal.title}"</strong> has been submitted to <strong>${event.name}</strong></p>
  <p><strong><a href="${appUrl}/organizer/event/${event.id}/proposal/${proposal.id}">Check it now!</a></strong></p>
  <p>
  Made with 💗 by <a href="${appUrl}">conference-hall.io</a> – <i>"${event.name}" team</i>
  </p>
</body>
</html>
`

export const proposalBatchAccepted = (event: Event) => `
<html>
<head>
  <title>Your talk has been accepted</title>
</head>
<body>
  <p>Dear %recipient.speakerName%,</p>
  <p>Your talk <strong>"%recipient.talkTitle%"</strong> at <strong>"${event.name}"</strong> has been accepted! 🎉  🎊</p>
  <p>In order to help organizers for the selection and the event management, please confirm your participation:<p>
  <ul>
  <li><a href="${appUrl}/speaker/talk/%recipient.talkId%"><strong>%recipient.talkTitle%</strong></a></li>
  </p>
  <p>See you there!</p>
  <p>Made with 💗 by <a href="${appUrl}">conference-hall.io</a> – <i>"${event.name}" team</i></p>
</body>
</html>
`

export const proposalBatchRejected = (event: Event) => `
<html>
<head>
  <title>Your talk has been declined</title>
</head>
<body>
  <p>Dear %recipient.speakerName%</p>
  <p>Your talk <strong>"%recipient.talkTitle%"</strong> has been declined.</p>
  <p>
  We had lots of excellent talks this year and choosing among them has been heart-breaking. 😓 
  Thank you very much for your submission and please consider submitting again next year.
  </p>
  <p>Made with 💗 by <a href="${appUrl}">conference-hall.io</a> – <i>"${event.name}" team</i></p>
</body>
</html>
`

export const proposalDeclined = (event: Event, proposal: Proposal) => `
<html>
<head>
  <title>Talk declined by speaker</title>
</head>
<body>
  <p>The talk <strong>"${proposal.title}"</strong> has been declined for <strong>${event.name}</strong></p>
  <p>Made with 💗 by <a href="${appUrl}">conference-hall.io</a> – <i>"${event.name}" team</i></p>
</body>
</html>
`

export const proposalConfirmed = (event: Event, proposal: Proposal) => `
<html>
<head>
  <title>Talk confirmed by speaker</title>
</head>
<body>
  <p>👌 Thanks for giving the talk <strong>"${proposal.title}"</strong> at <strong>${event.name}</strong>.</p>
  <p><strong>See you there!</strong></p>
  <p>Made with 💗 by <a href="${appUrl}">conference-hall.io</a> – <i>"${event.name}" team</i></p>
</body>
</html>
`
