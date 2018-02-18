import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'

import { lgf } from 'helpers/date'
import './cfpBlock.css'

class CfpBlock extends Component {
  renderCfpLabel = () => {
    const { cfpState } = this.props
    if (cfpState === 'not-started') return 'is not open yet'
    if (cfpState === 'opened') return 'is opened'
    return 'is closed'
  }

  renderConferenceDates = () => {
    const { cfpState, cfpDates, deliberationDate } = this.props
    return (
      <div>
        {cfpState === 'not-started' && !isEmpty(cfpDates) && `will open ${lgf(cfpDates.start)}`}
        {cfpState === 'opened' && !isEmpty(cfpDates) && `until ${lgf(cfpDates.end)}`}
        {cfpState === 'closed' &&
          deliberationDate &&
          `Deliberation date will be ${lgf(deliberationDate)}`}
      </div>
    )
  }

  render() {
    const { type, cfpState, className } = this.props
    return (
      <div className={cn('cfp-block', className, `cfp-block-${cfpState}`)}>
        <h2>
          <div className="cfp-block-title">Call for paper {this.renderCfpLabel()}</div>
          <div className="cfp-block-subtitle">
            {type === 'conference' && this.renderConferenceDates()}
          </div>
        </h2>
      </div>
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
