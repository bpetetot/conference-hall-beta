import React from 'react'
import PropTypes from 'prop-types'

import { getGitHubUserRepo } from 'helpers/github'
import Avatar from 'components/avatar'
import IconLabel from 'components/iconLabel'
import IconLink from 'components/iconLink'
import Markdown from 'components/markdown'
import { useUser } from 'features/user/useUser'

import styles from './speaker.module.css'

const Speaker = ({ userId }) => {
  const { data, isLoading } = useUser(userId)

  if (isLoading) return null

  const {
    displayName,
    photoURL,
    email,
    github,
    twitter,
    company,
    language,
    address,
    bio,
    speakerReferences,
  } = data

  const twitterUrl = twitter?.startsWith('@') ? twitter?.substr(1) : twitter

  return (
    <div>
      <Avatar name={displayName} src={photoURL} withLabel className={styles.avatar} />
      <div className={styles.icons}>
        <IconLink icon="fa fa-envelope-o" label={email} href={`mailto:${email}`} />
        <IconLink icon="fa fa-github" label={github} href={getGitHubUserRepo(github)} />
        <IconLink icon="fa fa-twitter" label={twitter} href={`https://twitter.com/${twitterUrl}`} />
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
  userId: PropTypes.string.isRequired,
}

export default Speaker
