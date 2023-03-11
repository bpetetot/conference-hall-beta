import React from 'react'
import PropTypes from 'prop-types'

import { getGitHubUserRepo } from 'helpers/github'
import UserAvatar from 'features/auth/userAvatar'
import IconLabel from 'components/iconLabel'
import IconLink from 'components/iconLink'
import Markdown from 'components/markdown'

import styles from './speaker.module.css'

function Speaker({
  uid,
  email,
  github,
  twitter,
  company,
  language,
  address,
  bio,
  speakerReferences,
}) {
  let twitterUser
  let twitterUrl
  if (twitter) {
    twitterUser = twitter.startsWith('@')
      ? twitter.substr(1)
      : twitter.replace(/https:\/\/twitter\.com\//, '')
    twitterUrl = `https://twitter.com/${twitterUser}`
  }
  let githubUser
  let githubUrl
  if (github) {
    githubUser = github.replace(/https:\/\/github\.com\//, '')
    githubUrl = getGitHubUserRepo(githubUser)
  }

  return (
    <div>
      <UserAvatar id={uid} className={styles.avatar} />
      <div className={styles.icons}>
        <IconLink icon="fa fa-envelope-o" label={email} href={`mailto:${email}`} />
        <IconLink icon="fa fa-github" label={githubUser} href={githubUrl} />
        <IconLink icon="fa fa-twitter" label={twitterUser} href={twitterUrl} />
        <IconLabel icon="fa fa-building-o" label={company} />
        <IconLabel icon="fa fa-map-marker" label={address && address.formattedAddress} />
        <IconLabel icon="fa fa-language" label={language} />
      </div>
      {bio && <Markdown source={bio} className={styles.bio} />}
      {speakerReferences && (
        <>
          <h4>Speaker References</h4>
          <Markdown source={speakerReferences} className={styles.bio} />
        </>
      )}
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
  address: PropTypes.object,
  bio: PropTypes.string,
  speakerReferences: PropTypes.string,
}

Speaker.defaultProps = {
  email: undefined,
  github: undefined,
  twitter: undefined,
  company: undefined,
  language: undefined,
  address: undefined,
  bio: undefined,
  speakerReferences: undefined,
}

export default Speaker
