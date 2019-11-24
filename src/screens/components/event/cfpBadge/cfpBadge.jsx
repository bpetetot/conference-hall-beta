import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'

class CfpBadge extends Component {
  renderCfpLabel = cfpState => {
    if (cfpState === 'not-started') return 'not opened yet'
    if (cfpState === 'opened') return 'opened'
    return 'closed'
  }

  render() {
    const { cfpState } = this.props
    return (
      <Badge
        success={cfpState === 'opened'}
        light={cfpState === 'not-started'}
        error={cfpState === 'closed'}
        outline
      >
        CFP {this.renderCfpLabel(cfpState)}
      </Badge>
    )
  }
}

CfpBadge.propTypes = {
  cfpState: PropTypes.oneOf(['not-started', 'opened', 'closed']),
}

CfpBadge.defaultProps = {
  cfpState: 'closed',
}

export default CfpBadge
