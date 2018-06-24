import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class OpenTrigger extends Component {
  state = { isOpen: this.props.open }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = (e) => {
    if (e.keyCode === 27) {
      this.hide()
    }
  }

  show = () => this.setState({ isOpen: true })

  hide = () => this.setState({ isOpen: false })

  toggle = () => this.setState(state => ({ isOpen: !state.isOpen }))

  render() {
    const { isOpen } = this.state
    const { children, renderTrigger } = this.props
    const { show, hide, toggle } = this

    return (
      <Fragment>
        {renderTrigger &&
          renderTrigger({
            isOpen,
            show,
            hide,
            toggle,
          })}
        {isOpen &&
          children({
            isOpen,
            show,
            hide,
            toggle,
          })}
      </Fragment>
    )
  }
}

OpenTrigger.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func,
}

OpenTrigger.defaultProps = {
  renderTrigger: undefined,
  open: false,
}

export default OpenTrigger
