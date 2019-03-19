module.exports = (event, users, talk, url) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>✨Your talk has been accepted✨</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
</head>
<body>
  <p>Dear ${users.map(user => user.displayName).join(', ')}</p>
  <p>Your talk <strong>"${talk.title}"</strong> has been accepted! 🎉  🎊</p>
  <p>In order to help organizers for the selection and the event management, please confirm your participation:<p>
  <ul>
  <li><strong><a href="${url}/speaker/talk/${talk.id}">My talk <strong>${talk.title}<strong></a></li></strong>
  </p>
  <p>
  See you there!
  </p>
  <p>
  Made with 💗 by <a href="${url}">conference-hall.io</a> – <i>"${event.name}" team</i>
  </p>
  </body>
</html>
`
