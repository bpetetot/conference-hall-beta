import React from 'react'
import PropTypes from 'prop-types'

import { getGitHubUserRepo } from 'helpers/github'
import Avatar from 'components/avatar'
import IconLabel from 'components/iconLabel'
import IconLink from 'components/iconLink'
import Markdown from 'components/markdown'

import styles from './speaker.module.css'

function getTwitterUrl(twitter) {
  const handle = twitter?.startsWith('@') ? twitter.substr(1) : twitter
  return `https://twitter.com/${handle}`
}

const Speaker = ({ speaker }) => {
  const { photoURL, name, bio, email, company, address, github, twitter, references } = speaker

  return (
    <div>
      <Avatar src={photoURL} name={name} withLabel className={styles.avatar} />
      <div className={styles.icons}>
        <IconLink icon="fa fa-envelope-o" label={email} href={`mailto:${email}`} />
        <IconLink icon="fa fa-github" label={github} href={getGitHubUserRepo(github)} />
        <IconLink icon="fa fa-twitter" label={twitter} href={getTwitterUrl(twitter)} />
        <IconLabel icon="fa fa-building-o" label={company} />
        <IconLabel icon="fa fa-map-marker" label={address} />
      </div>
      {bio && <Markdown source={bio} className={styles.bio} />}
      {references && (
        <>
          <h4>Speaker References</h4>
          <Markdown source={references} className={styles.bio} />
        </>
      )}
    </div>
  )
}

Speaker.propTypes = {
  speaker: PropTypes.object.isRequired,
}

export default Speaker
