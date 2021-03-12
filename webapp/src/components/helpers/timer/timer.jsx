import { Component } from 'react'
import PropTypes from 'prop-types'

class Timer extends Component {
  componentDidMount() {
    const { enabled, delay, onFinish } = this.props
    if (enabled) {
      this.timer = setTimeout(onFinish, delay)
    }
  }

  componentWillUnmount() {
    const { enabled } = this.props
    if (enabled && this.timer) {
      clearTimeout(this.timer)
    }
  }

  render() {
    return this.props.children
  }
}

Timer.propTypes = {
  enabled: PropTypes.bool,
  delay: PropTypes.number,
  onFinish: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

Timer.defaultProps = {
  enabled: true,
  delay: 1000,
}

export default Timer
