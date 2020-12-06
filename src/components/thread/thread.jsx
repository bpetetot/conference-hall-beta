/* eslint-disable */
import React, { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import Message from './message'
import styles from './thread.module.css'

const Thread = ({
  description,
  messages,
  className,
  onSaveMessage,
  onDeleteMessage,
  currentUser,
}) => {
  const thread = useRef()
  const input = useRef()

  useEffect(() => {
    const { current } = thread
    current.scrollTop = current.scrollHeight
  }, [messages])

  const handleAddMessage = useCallback(() => {
    const message = input.current.value
    if (message) {
      onSaveMessage(message)
      input.current.value = ''
    }
  }, [onSaveMessage, input])

  const handleKey = useCallback(
    e => {
      if (e.keyCode === 13) handleAddMessage()
    },
    [handleAddMessage],
  )

  return (
    <div className={cn(styles.thread, className)}>
      {description && <div className={styles.description}>{description}</div>}
      <div ref={thread} className={styles.messages}>
        {messages.map((message, index) => (
          <Message
            allowEdit={currentUser === message.owner}
            key={index}
            {...message}
            onSave={onSaveMessage}
            onDelete={onDeleteMessage}
            className={styles.message}
          />
        ))}
      </div>
      <div className={styles.input}>
        <input
          ref={input}
          type="text"
          name="message"
          placeholder="Type a message"
          onKeyDown={handleKey}
          autoComplete="off"
          aria-label="Type a message"
        />
        <Button onClick={handleAddMessage}>Send</Button>
      </div>
    </div>
  )
}

Thread.propTypes = {
  currentUser: PropTypes.string.isRequired,
  description: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape(Message.propTypes)),
  onSaveMessage: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Thread.defaultProps = {
  description: undefined,
  messages: [],
  className: undefined,
}

export default Thread
