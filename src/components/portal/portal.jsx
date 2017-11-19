import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

class Portal extends React.Component {
  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode)
    }
    this.defaultNode = null
  }

  render() {
    if (!this.defaultNode) {
      this.defaultNode = document.createElement('div')
      this.defaultNode.className = this.props.className
      document.body.appendChild(this.defaultNode)
    }
    return createPortal(this.props.children, this.defaultNode)
  }
}

Portal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Portal.defaultProps = {
  className: undefined,
}

export default Portal
