import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import Message from './message'
import styles from './thread.module.css'

class Thread extends Component {
  thread = React.createRef()

  componentDidMount() {
    if (this.thread) {
      const { current } = this.thread
      current.scrollTop = current.scrollHeight
    }
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
          <input type="text" name="message" placeholder="Send a message" />
          <Button>Send</Button>
        </div>
      </div>
    )
  }
}

Thread.propTypes = {
  description: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
  className: PropTypes.string,
}

Thread.defaultProps = {
  description: undefined,
  messages: [],
  className: undefined,
}

export default Thread
