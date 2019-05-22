import React from 'react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { GITHUB_REPO } from 'helpers/github'
import IconLabel from 'components/iconLabel'
import ContributorsList from 'components/contributors'

const Contributors = () => (
  <div>
    <h1>
      <IconLabel icon="fa fa-github-alt" label="Thanks to all contributors!" />
    </h1>
    <ContributorsList />
    <small>
      If you want to contribute, feel free to{' '}
      <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
        check it out.
      </a>
    </small>
  </div>
)

export default forRoute.absolute([
  'home',
  'public-contributors',
  'organizer-contributors',
  'speaker-contributors',
])(Contributors)
