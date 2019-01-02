import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Avatar from 'components/avatar'

import styles from './message.module.css'

const Message = ({
  img, name, message, date, className,
}) => (
  <div className={cn(styles.wrapper, className)}>
    <Avatar src={img} name={name} size="medium" className={styles.avatar} />
    <div>
      <div className={styles.message}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{distanceInWordsToNow(date, { addSuffix: true })}</span>
      </div>
      <div className={styles.message}>
        {message}
      </div>
    </div>
  </div>
)

Message.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.string,
}

Message.defaultProps = {
  img: undefined,
  className: undefined,
}

export default Message
