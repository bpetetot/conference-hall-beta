module.exports = (event, talk, url) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Talk confirmed</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
</head>
<body>
  <p>👌 Thanks for giving the talk <strong>"${talk.title}"</strong> at <strong>${event.name}</strong>.</p>
  <p>
  <strong>See you there!</strong>
  </p>
  <p>
  Made with 💗 by <a href="${url}">conference-hall.io</a> – <i>"${event.name}" team</i>
  </p>
  </body>
</html>
`
