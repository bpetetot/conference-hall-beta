import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './cfpBlock.css'

class CfpBlock extends Component {
  renderCfpLabel = () => {
    const { cfpState } = this.props
    if (cfpState === 'not-started') return 'is not open yet'
    if (cfpState === 'opened') return 'is opened'
    return 'is closed'
  }

  render() {
    const {
      type, cfpState, start, end, deliberation, className,
    } = this.props

    return (
      <div className={cn('cfp-block', className, `cfp-block-${cfpState}`)}>
        <div className="cfp-block-title">Call for paper {this.renderCfpLabel()}</div>
        {type === 'conference' && (
          <div className="cfp-block-subtitle">
            {cfpState === 'not-started' && !!start && `Will open ${start}`}
            {cfpState === 'opened' && !!end && `Until ${end}`}
            {cfpState === 'closed' && deliberation && `Deliberation date will be ${deliberation}`}
          </div>
        )}
      </div>
    )
  }
}

CfpBlock.propTypes = {
  type: PropTypes.string,
  cfpState: PropTypes.oneOf(['not-started', 'opened', 'closed']),
  start: PropTypes.string,
  end: PropTypes.string,
  deliberation: PropTypes.string,
  className: PropTypes.string,
}

CfpBlock.defaultProps = {
  type: undefined,
  cfpState: 'closed',
  start: undefined,
  end: undefined,
  deliberation: undefined,
  className: undefined,
}

export default CfpBlock
