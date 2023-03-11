/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popper from 'popper.js'
import cn from 'classnames'

import TooltipOverlay from './tooltipOverlay'

class Tooltip extends Component {
  state = {
    opened: false,
    popperStyle: {},
    arrowStyle: {},
    placement: '',
  }

  componentDidMount() {
    const { placement } = this.props
    this.popperInstance = new Popper(this.targetRef, this.tooltip.popperRef, {
      placement,
      modifiers: {
        preventOverflow: { boundariesElement: 'viewport' },
        applyStyle: { enabled: false },
        updateState: {
          fn: this.updatePositions,
          enabled: true,
          order: 900,
        },
        arrow: { element: this.tooltip.arrowRef },
      },
    })
    this.popperInstance.update()
  }

  componentWillUnmount() {
    this.popperInstance.destroy()
  }

  handleHover = (type) => () => {
    this.setState(() => ({ opened: type === 'enter' }))
    this.popperInstance.update()
  }

  handleOpened = () => {
    if (this.state.opened) {
      this.setState(() => ({ opened: false }))
    } else {
      this.setState(() => ({ opened: true }))
    }
    this.popperInstance.update()
  }

  updatePositions = (data) => {
    this.setState(() => ({
      popperStyle: data.styles,
      arrowStyle: data.offsets.arrow,
      placement: data.attributes['x-placement'],
    }))
    return data
  }

  render() {
    const { tooltip, inline, className, children } = this.props
    return (
      <button
        type="button"
        ref={(r) => (this.targetRef = r)}
        onMouseEnter={this.handleHover('enter')}
        onMouseLeave={this.handleHover('leave')}
        onClick={this.handleOpened}
        className={cn('cc-tooltip-button', className)}
        style={{ display: inline ? 'inline' : 'block' }}
        aria-label="More info"
      >
        {children}
        <TooltipOverlay ref={(t) => (this.tooltip = t)} content={tooltip} {...this.state} />
      </button>
    )
  }
}

Tooltip.propTypes = {
  tooltip: PropTypes.node.isRequired,
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  placement: PropTypes.oneOf(['auto', 'top', 'bottom', 'left', 'right']),
}

Tooltip.defaultProps = {
  placement: 'auto',
  inline: false,
  className: undefined,
}

export default Tooltip
