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

<div itemscope itemtype="http://schema.org/Event">
  <meta itemprop="name" content="Taco Night"/>
  <meta itemprop="startDate" content="2027-04-18T15:30:00Z"/>
  <meta itemprop="endDate" content="2027-04-18T16:30:00Z"/>
  <div itemprop="location" itemscope itemtype="http://schema.org/Place">
    <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <meta itemprop="name" content="Google"/>
      <meta itemprop="streetAddress" content="24 Willie Mays Plaza"/>
      <meta itemprop="addressLocality" content="San Francisco"/>
      <meta itemprop="addressRegion" content="CA"/>
      <meta itemprop="postalCode" content="94107"/>
      <meta itemprop="addressCountry" content="USA"/>
    </div>
  </div>
  <div itemprop="potentialAction" itemscope itemtype="http://schema.org/RsvpAction">
    <div itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
      <link itemprop="url" href="https://us-central1-rivieradev-db8f5.cloudfunctions.net/rsvp?eventId=${event.id}&amp;talkId=${talk.id}&amp;value=yes"/>
    </div>
    <link itemprop="attendance" href="http://schema.org/RsvpAttendance/Yes"/>
    <meta itemprop="rsvpResponse" content="yes">
  </div>
  <div itemprop="potentialAction" itemscope itemtype="http://schema.org/RsvpAction">
    <div itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
      <link itemprop="url" href="https://us-central1-rivieradev-db8f5.cloudfunctions.net/rsvp?eventId=${event.id}&amp;talkId=${talk.id}&amp;value=no"/>
    </div>
    <link itemprop="attendance" href="http://schema.org/RsvpAttendance/No"/>
    <meta itemprop="rsvpResponse" content="no">
  </div>
  <div itemprop="potentialAction" itemscope itemtype="http://schema.org/RsvpAction">
    <div itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler">
      <link itemprop="url" href="http://mysite.com/rsvp?eventId=123&value=maybe"/>
    </div>
    <link itemprop="attendance" href="http://schema.org/RsvpAttendance/Maybe"/>
    <meta itemprop="rsvpResponse" content="maybe">
  </div>
</div>

  <p>Dear ${users.map(user => user.displayName).join(', ')}</p>
  <p>Your talk <strong>"${talk.title}"</strong> at <strong>"${event.name}"</strong> has been accepted! 🎉  🎊</p>
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
