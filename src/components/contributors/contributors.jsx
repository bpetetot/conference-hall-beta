import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Avatar from 'components/avatar'
import { CONTRIBUTORS_API } from 'helpers/github'

import styles from './contributors.module.css'

const EXCLUDED_CONTRIBUTORS = ['greenkeeper[bot]']

const fetchContributors = async callback => {
  try {
    const response = await fetch(CONTRIBUTORS_API)
    const result = await response.json()
    callback(result || [])
  } catch (e) {
    callback([])
  }
}
const Contributors = ({ className }) => {
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    fetchContributors(setContributors)
  }, [])

  return (
    <div className={cn(styles.list, className)}>
      {contributors
        .filter(c => !EXCLUDED_CONTRIBUTORS.includes(c.login))
        .map(c => (
          <div key={c.id} className={styles.wrapper}>
            <div className={styles.contributor}>
              <Avatar name={c.login} src={c.avatar_url} size="large" className={styles.avater} />
              <a
                className={styles.name}
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.login}
              </a>
            </div>
          </div>
        ))}
    </div>
  )
}

Contributors.propTypes = {
  className: PropTypes.string,
}

Contributors.defaultProps = {
  className: undefined,
}

export default Contributors
