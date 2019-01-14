import React from 'react'
import PropTypes from 'prop-types'

import { getGitHubUserRepo } from 'helpers/github'
import UserAvatar from 'screens/components/userAvatar'
import IconLabel from 'components/iconLabel'
import IconLink from 'components/iconLink'
import Markdown from 'components/markdown'

import styles from './speaker.module.css'

const Speaker = ({
  uid, email, github, twitter, company, language, city, bio,
}) => {
  let twitterUrl
  if (twitter) {
    twitterUrl = twitter.startsWith('@') ? twitter.substr(1) : twitter
  }

  return (
    <div>
      <UserAvatar id={uid} className={styles.avatar} />
      <div className={styles.icons}>
        <IconLink icon="fa fa-envelope-o" label={email} href={`mailto:${email}`} />
        <IconLink icon="fa fa-github" label={github} href={getGitHubUserRepo(github)} />
        <IconLink icon="fa fa-twitter" label={twitter} href={`https://twitter.com/${twitterUrl}`} />
        <IconLabel icon="fa fa-building-o" label={company} />
        <IconLabel icon="fa fa-map-marker" label={city} />
        <IconLabel icon="fa fa-language" label={language} />
      </div>
      {bio && <Markdown source={bio} className={styles.bio} />}
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
