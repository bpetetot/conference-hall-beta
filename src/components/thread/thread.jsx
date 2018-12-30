import React from 'react'
import PropTypes from 'prop-types'

import Message from './message'
import styles from './thread.module.css'

const Threads = ({ messages, className }) => (
  <div className={className}>
    {messages.map(({ id, ...message }) => (
      <Message key={id} {...message} className={styles.message} />
    ))}
  </div>
)

Threads.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
  className: PropTypes.string,
}

Threads.defaultProps = {
  messages: [],
  className: undefined,
}

export default Threads
