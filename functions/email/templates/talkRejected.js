module.exports = (event, users, talk, url) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Your talk has been declined</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
</head>
<body>
  <p>Dear ${users.map(user => user.displayName).join(', ')}</p>
  <p>Your talk <strong>"${talk.title}"</strong> has been declined.</p>
  <p>
  We had lots of excellent talks this year and choosing has been heart-breaking 😓 
  Thank you very for your submission and please consider resubmitting next year.
  </p>
  <p>
  Made with 💗 by <a href="${url}">conference-hall.io</a> – <i>"${event.name}" team</i>
  </p>
  </body>
</html>
`
