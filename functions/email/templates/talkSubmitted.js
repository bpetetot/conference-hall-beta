module.exports = (event, talk, app) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Submission confirmed</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
</head>
<body>
  <p>Your talk <strong>"${talk.title}"</strong> has been successfully submitted.</p>
  <p>In order to help organizers select and manage the event, please don't forget to fill:<p>
  <ul>
  <li><strong><a href="${app.url}/speaker/profile">Your profile</a></li></strong>
  ${event.surveyActive ? `<li><strong><a href="${app.url}/speaker/event/${event.id}/survey">The speaker survey</a></li></strong>` : ''}
  </ul>
  <p>
  You will soon be informed if your talk has been selected or not.
  </p>
  <p>
  Thanks!
  </p>
  <p>
  Made with 💗 by <a href="${app.url}">conference-hall.io</a> – <i>"${event.name}" team</i>
  </p>
  </body>
</html>
`
