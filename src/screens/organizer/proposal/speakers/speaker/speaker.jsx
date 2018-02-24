import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'screens/components/speaker'
import IconLabel from 'components/iconLabel'
import IconLink from 'components/iconLink'
import Markdown from 'components/markdown'
import './speaker.css'

const Speaker = ({
  uid, email, github, twitter, company, language, city, bio,
}) => {
  let twitterUrl
  if (twitter) {
    twitterUrl = twitter.startsWith('@') ? twitter.substr(1) : twitter
  }

  return (
    <div>
      <Avatar id={uid} className="proposal-speaker-avatar" />
      <div className="proposal-speaker-icons">
        <IconLink icon="fa fa-envelope-o" label={email} href={`mailto:${email}`} />
        <IconLink icon="fa fa-github" label={github} href={`https://github.com/${github}`} />
        <IconLink icon="fa fa-twitter" label={twitter} href={`https://twitter.com/${twitterUrl}`} />
        <IconLabel icon="fa fa-building-o" label={company} />
        <IconLabel icon="fa fa-map-marker" label={city} />
        <IconLabel icon="fa fa-language" label={language} />
      </div>
      <Markdown source={bio} />
    </div>
  )
}

Speaker.propTypes = {
  uid: PropTypes.string.isRequired,
  email: PropTypes.string,
  github: PropTypes.string,
  twitter: PropTypes.string,
  company: PropTypes.string,
  language: PropTypes.string,
  city: PropTypes.string,
  bio: PropTypes.string,
}

Speaker.defaultProps = {
  email: undefined,
  github: undefined,
  twitter: undefined,
  company: undefined,
  language: undefined,
  city: undefined,
  bio: undefined,
}

export default Speaker
