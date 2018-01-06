import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { lgf } from 'helpers/date'
import IconCard from 'components/iconCard'
import './cfpBlock.css'

class CfpBlock extends Component {
  renderCfpLabel = () => {
    const { cfpState } = this.props
    if (cfpState === 'not-started') return <b>is not open yet</b>
    if (cfpState === 'opened') return <b>is opened</b>
    return <b>is closed</b>
  }

  renderConferenceDates = () => {
    const { cfpState, cfpDates, deliberationDate } = this.props
    return (
      <div>
        {cfpState === 'not-started' &&
          !isEmpty(cfpDates) && <small>will open {lgf(cfpDates.start)}</small>}
        {cfpState === 'opened' && !isEmpty(cfpDates) && <small>until {lgf(cfpDates.end)}</small>}
        {cfpState === 'closed' &&
          deliberationDate && <small>Deliberation date will be {lgf(deliberationDate)}</small>}
      </div>
    )
  }

  render() {
    const { type, cfpState, className } = this.props
    return (
      <IconCard
        icon="fa fa-paper-plane-o"
        className={cn('cfp-block', className, `cfp-block-${cfpState}`)}
      >
        <h3>Call for paper {this.renderCfpLabel()}</h3>
        {type === 'conference' && this.renderConferenceDates()}
      </IconCard>
    )
  }
}

CfpBlock.propTypes = {
  type: PropTypes.string,
  cfpState: PropTypes.oneOf(['not-started', 'opened', 'closed']),
  cfpDates: PropTypes.objectOf(PropTypes.object),
  deliberationDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
}

CfpBlock.defaultProps = {
  type: undefined,
  cfpState: 'closed',
  cfpDates: {},
  deliberationDate: undefined,
  className: undefined,
}

export default CfpBlock
