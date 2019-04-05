import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Avatar from 'components/avatar'
import Button from 'components/button'

import styles from './message.module.css'

const Message = ({
  id, img, name, message, date, className, modified, editable, onEdit, allowEdit, onSave,
}) => {
  const [inputMessageValue, setInputMessageValue] = useState(message)
  const onChange = (event) => {
    setInputMessageValue(event.target.value)
  }
  const onCancel = () => {
    setInputMessageValue(message)
    onEdit(id)
  }

  const handleKey = (event) => {
    if (event.keyCode === 13) {
      onSave(inputMessageValue, id)
    }
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <Avatar src={img} name={name} size="medium" className={styles.avatar} />
      <div>
        <div className={styles.message}>
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>
            {distanceInWordsToNow(date, { addSuffix: true })}
            {modified && ' ( modified )'}
          </span>
          {allowEdit && <i role="button" className={cn('fa fa-pencil', styles.edit)} onClick={() => onEdit(id)} />}
        </div>
        {!editable && (
        <div className={styles.message}>
          {message}
        </div>
        )}
        {editable && (
        <div className={styles.editInput}>
          <input
            type="text"
            name="message"
            value={inputMessageValue}
            onChange={onChange}
            onKeyDown={handleKey}
          />
          <Button size="small" secondary onClick={onCancel}>Cancel</Button>
          <Button size="small" onClick={() => onSave(inputMessageValue, id)}>Save changes</Button>
        </div>
        )}
      </div>
    </div>
  )
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  editable: PropTypes.bool,
  modified: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

Message.defaultProps = {
  img: undefined,
  className: undefined,
  editable: false,
  modified: false,
}

export default Message
