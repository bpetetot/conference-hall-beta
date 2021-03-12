import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import Badge from 'components/badge'
import Markdown from 'components/markdown'
import { formatDate } from 'helpers/date'

import styles from './talk.module.css'

const Talk = ({ proposal, className }) => (
  <div className={cn(className, 'card')}>
    <div className={styles.title}>
      <h2>{proposal.title}</h2>
    </div>
    <div className={styles.metadata}>
      <div className={styles.badges}>
        {!isEmpty(proposal.formats) && (
          <Badge outline pill light>
            {proposal.formats[0].name}
          </Badge>
        )}
        {!isEmpty(proposal.categories) && (
          <Badge outline pill light>
            {proposal.categories[0].name}
          </Badge>
        )}
        <Badge outline pill light>
          {proposal.level}
        </Badge>
        <Badge outline pill light>
          {proposal.language}
        </Badge>
      </div>
      <div>
        <small>Submitted on {formatDate(proposal.createdAt, 'large')}</small>
      </div>
    </div>
    <div className={styles.infos}>
      <Markdown source={proposal.abstract} />
      {proposal.references && <h3>References</h3>}
      <Markdown source={proposal.references} />
      {proposal.comments && <h3>Message to organizers</h3>}
      <Markdown source={proposal.comments} />
    </div>
  </div>
)

Talk.propTypes = {
  proposal: PropTypes.object.isRequired,
  className: PropTypes.string,
}

Talk.defaultProps = {
  className: undefined,
}

export default Talk
