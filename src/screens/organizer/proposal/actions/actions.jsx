import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import './actions.css'

const Actions = ({
  eventId, proposal, hasNext, hasPrevious, onNext, onPrevious, className,
}) => (
  <div className={cn(className, 'proposal-actions-layout card')}>
    <button className="btn btn-link btn-previous" disabled={!hasPrevious} onClick={onPrevious}>
      <IconLabel icon="fa fa-angle-left" label="Previous" />
    </button>
    <ul className="proposal-actions-nav tabs">
      <li>
        <Link
          href={`/organizer/event/${eventId}/proposal/${proposal.id}`}
          activeProps={{ className: 'tab-active' }}
        >
          <IconLabel icon="fa fa-microphone" label="Talk" />
        </Link>
      </li>
      <li>
        <Link
          href={`/organizer/event/${eventId}/proposal/${proposal.id}/survey`}
          activeProps={{ className: 'tab-active' }}
        >
          <IconLabel icon="fa fa-question" label="Speaker survey" />
        </Link>
      </li>
      <li>
        <Link
          href={`/organizer/event/${eventId}/proposal/${proposal.id}/organizers`}
          activeProps={{ className: 'tab-active' }}
        >
          <IconLabel icon="fa fa-users" label="Team" />
        </Link>
      </li>
    </ul>
    <button className="btn btn-link btn-next" disabled={!hasNext} onClick={onNext}>
      <IconLabel icon="fa fa-angle-right" label="Next" right />
    </button>
  </div>
)

Actions.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposal: PropTypes.objectOf(PropTypes.any).isRequired,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Actions.defaultProps = {
  hasNext: false,
  hasPrevious: false,
  className: undefined,
}

export default Actions
