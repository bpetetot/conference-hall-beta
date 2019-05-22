import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/avatar'

import styles from './contributor.module.css'

const Contributor = ({ name, image, url }) => (
  <div className={styles.contributor}>
    <Avatar name={name} src={image} size="large" className={styles.contributorAvatar} />
    <a className={styles.contributorName} href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  </div>
)

Contributor.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Contributor
