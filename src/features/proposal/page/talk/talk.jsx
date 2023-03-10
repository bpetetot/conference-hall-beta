import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { withSizes } from 'styles/utils'
import Badge from 'components/badge'
import Markdown from 'components/markdown'
import { FormatBadge, CategoryBadge } from 'features/event/badges'
import ProposalSelection from 'features/proposal/selection'
import { formatTimestamp } from 'helpers/firebase'

import styles from './talk.module.css'

function Talk({ eventId, proposal, deliberationActive, isMobile, className }) {
  return (
    <div className={cn(className, 'card')}>
      <div className={styles.title}>
        <h2>{proposal.title}</h2>
        <div>
          {!isMobile && deliberationActive && (
            <div>
              <ProposalSelection eventId={eventId} proposalId={proposal.id} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.metadata}>
        <div className={styles.badges}>
          <FormatBadge outline pill light eventId={eventId} formatId={proposal.formats} />
          <CategoryBadge outline pill light eventId={eventId} categoryId={proposal.categories} />
          <Badge outline pill light>
            {proposal.level}
          </Badge>
          <Badge outline pill light>
            {proposal.language}
          </Badge>
        </div>
        <div>
          <small>Submitted on {formatTimestamp(proposal.createTimestamp, 'large')}</small>
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
}

Talk.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  deliberationActive: PropTypes.bool,
  isMobile: PropTypes.bool,
}

Talk.defaultProps = {
  proposal: {},
  deliberationActive: false,
  isMobile: false,
  className: undefined,
}

export default withSizes(Talk)
