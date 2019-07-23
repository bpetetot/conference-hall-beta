import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { formatDate } from 'helpers/date'

import './cfpBlock.css'

class CfpBlock extends Component {
  renderCfpLabel = () => {
    const { cfpState } = this.props
    if (cfpState === 'not-started') return 'is not open yet'
    if (cfpState === 'opened') return 'is opened'
    return 'is closed'
  }

  renderConferenceDates = () => {
    const {
      cfpState, start, end, deliberationDate,
    } = this.props
    return (
      <div>
        {cfpState === 'not-started' && !!start && `will open ${formatDate(start, 'large')}`}
        {cfpState === 'opened' && !!end && `until ${formatDate(end, 'large')}`}
        {cfpState === 'closed'
          && deliberationDate
          && `Deliberation date will be ${formatDate(deliberationDate, 'large')}`}
      </div>
    )
  }

  render() {
    const { type, cfpState, className } = this.props
    return (
      <div className={cn('cfp-block', className, `cfp-block-${cfpState}`)}>
        <div className="cfp-block-title">Call for paper {this.renderCfpLabel()}</div>
        <div className="cfp-block-subtitle">
          {type === 'conference' && this.renderConferenceDates()}
        </div>
      </div>
    )
  }
}

CfpBlock.propTypes = {
  type: PropTypes.string,
  cfpState: PropTypes.oneOf(['not-started', 'opened', 'closed']),
  start: PropTypes.any,
  end: PropTypes.any,
  deliberationDate: PropTypes.any,
  className: PropTypes.string,
}

CfpBlock.defaultProps = {
  type: undefined,
  cfpState: 'closed',
  start: undefined,
  end: undefined,
  deliberationDate: undefined,
  className: undefined,
}

export default CfpBlock
