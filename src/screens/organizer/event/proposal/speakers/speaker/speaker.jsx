import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'screens/components/speaker'
import IconLabel from 'components/iconLabel'
import Markdown from 'components/markdown'
import './speaker.css'

const Speaker = ({
  uid, email, company, language, city, bio,
}) => (
  <div>
    <Avatar id={uid} className="proposal-speaker-avatar" />
    <div className="proposal-speaker-icons">
      <IconLabel icon="fa fa-envelope-o" label={email} />
      <IconLabel icon="fa fa-building-o" label={company} />
      <IconLabel icon="fa fa-map-marker" label={city} />
      <IconLabel icon="fa fa-language" label={language} />
    </div>
    <Markdown source={bio} />
  </div>
)

Speaker.propTypes = {
  uid: PropTypes.string.isRequired,
  email: PropTypes.string,
  company: PropTypes.string,
  language: PropTypes.string,
  city: PropTypes.string,
  bio: PropTypes.string,
}

Speaker.defaultProps = {
  email: undefined,
  company: undefined,
  language: undefined,
  city: undefined,
  bio: undefined,
}

export default Speaker
