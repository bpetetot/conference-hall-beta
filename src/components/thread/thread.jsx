import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import Message from './message'
import styles from './thread.module.css'

class Thread extends Component {
  state = {
    message: undefined,
  }

  thread = React.createRef()

  componentDidMount() {
    if (this.thread) {
      const { current } = this.thread
      current.scrollTop = current.scrollHeight
    }
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  handleAddMessage = () => {
    const { message } = this.state
    this.props.onAddMessage(message)
  }

  render() {
    const { description, messages, className } = this.props
    return (
      <div className={cn(styles.thread, className)}>
        {description && <div className={styles.description}>{description}</div>}
        <div ref={this.thread} className={styles.messages}>
          {messages.map(({ id, ...message }) => (
            <Message key={id} {...message} className={styles.message} />
          ))}
        </div>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Send a message"
            onChange={this.handleChange}
          />
          <Button onClick={this.handleAddMessage}>Send</Button>
        </div>
      </div>
    )
  }
}

Thread.propTypes = {
  description: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
  onAddMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Thread.defaultProps = {
  description: undefined,
  messages: [],
  className: undefined,
}

export default Thread
