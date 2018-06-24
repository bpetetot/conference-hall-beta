import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class OpenTrigger extends Component {
  state = { isOpen: this.props.defaultOpen }

  componentDidMount() {
    if (this.props.withEscapeClose) {
      document.addEventListener('keydown', this.handleKeydown)
    }
  }

  componentWillUnmount() {
    if (this.props.withEscapeClose) {
      document.removeEventListener('keydown', this.handleKeydown)
    }
  }

  handleKeydown = (e) => {
    if (e.keyCode === 27) {
      this.hide()
    }
  }

  show = () => {
    this.setState({ isOpen: true })
    if (this.props.onOpen) this.props.onOpen()
  }

  hide = () => {
    this.setState({ isOpen: false })
    if (this.props.onClose) this.props.onClose()
  }

  render() {
    const { isOpen } = this.state
    const { children, renderTrigger } = this.props
    const { show, hide } = this

    return (
      <Fragment>
        {renderTrigger && renderTrigger({ isOpen, show, hide })}
        {isOpen && children({ isOpen, show, hide })}
      </Fragment>
    )
  }
}

OpenTrigger.propTypes = {
  defaultOpen: PropTypes.bool,
  children: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  withEscapeClose: PropTypes.bool,
}

OpenTrigger.defaultProps = {
  renderTrigger: undefined,
  defaultOpen: false,
  onOpen: undefined,
  onClose: undefined,
  withEscapeClose: true,
}

export default OpenTrigger
