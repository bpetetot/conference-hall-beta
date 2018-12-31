import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Message from './message'
import styles from './thread.module.css'

class Thread extends Component {
  thread = React.createRef();

  componentDidMount() {
    if (this.thread) {
      const { current } = this.thread
      current.scrollTop = current.scrollHeight
    }
  }

  render() {
    const { messages, className } = this.props
    return (
      <div className={cn(styles.thread, className)}>
        <div ref={this.thread} className={styles.messages}>
          {messages.map(({ id, ...message }) => (
            <Message key={id} {...message} className={styles.message} />
          ))}
        </div>
        <div className={styles.input}>
          <input type="text" name="message" placeholder="Send a message" />
        </div>
      </div>
    )
  }
}

Thread.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
  className: PropTypes.string,
}

Thread.defaultProps = {
  messages: [],
  className: undefined,
}

export default Thread
