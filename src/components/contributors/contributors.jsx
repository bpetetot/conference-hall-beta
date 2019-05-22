import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { CONTRIBUTORS_API } from 'helpers/github'
import Contributor from './contributor'

import styles from './contributors.module.css'

const EXCLUDED_CONTRIBUTORS = ['greenkeeper[bot]']

const fetchContributors = async (callback) => {
  const response = await fetch(CONTRIBUTORS_API)
  const result = await response.json()
  callback(result)
}
const Contributors = ({ className }) => {
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    fetchContributors(setContributors)
  }, [])

  return (
    <div className={cn(styles.contributorsList, className)}>
      {contributors
        .filter(c => !EXCLUDED_CONTRIBUTORS.includes(c.login))
        .map(c => (
          <Contributor key={c.id} name={c.login} image={c.avatar_url} url={c.html_url} />
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
