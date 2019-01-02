/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import Message from './message'
import styles from './thread.module.css'

class Thread extends Component {
  thread = React.createRef()

  input = React.createRef()

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(oldProps) {
    if (
      this.props.messages
      && oldProps.messages
      && this.props.messages.length > oldProps.messages.length
    ) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    const { current } = this.thread
    current.scrollTop = current.scrollHeight
  }

  handleAddMessage = () => {
    const message = this.input.current.value
    if (message) {
      this.props.onAddMessage(message)
      this.input.current.value = ''
    }
  }

  handleKey = (e) => {
    if (e.keyCode === 13) {
      this.handleAddMessage()
    }
  }

  render() {
    const { description, messages, className } = this.props

    return (
      <div className={cn(styles.thread, className)}>
        {description && <div className={styles.description}>{description}</div>}
        <div ref={this.thread} className={styles.messages}>
          {messages.map((message, index) => (
            <Message key={index} {...message} className={styles.message} />
          ))}
        </div>
        <div className={styles.input}>
          <input
            ref={this.input}
            type="text"
            name="message"
            placeholder="Send a message"
            onKeyDown={this.handleKey}
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
