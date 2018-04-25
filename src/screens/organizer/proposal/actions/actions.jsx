import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import Drawer from 'components/drawer'
import TeamRatings from './teamRatings'

import './actions.css'

const Actions = ({ proposal, className }) => (
  <div className={cn('proposal-actions-btn', className)}>
    <Drawer
      opener={open => (
        <button className="btn btn-default" onClick={open}>
          <IconLabel icon="fa fa-star-o" label="All ratings" />
        </button>
      )}
      title="Team ratings"
      content={<TeamRatings id={proposal.id} />}
    />

    <Drawer
      opener={open => (
        <button className="btn btn-default" onClick={open}>
          <IconLabel icon="fa fa-comments" label="Team comments" />
        </button>
      )}
      title="Team comments"
      subtitle="All comments are stricly between organizers"
      content="Not implemented yet"
    />
  </div>
)

Actions.propTypes = {
  proposal: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
}

Actions.defaultProps = {
  proposal: {},
  className: undefined,
}

export default Actions
