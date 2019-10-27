import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Avatar from 'components/avatar'
import Button from 'components/button'
import { ConfirmationPopin } from 'components/portals'

import styles from './message.module.css'

const Message = ({
  id, img, name, message, date, className, modified, allowEdit, onSave, onDelete,
}) => {
  const [inputMessageValue, setInputMessageValue] = useState(message)

  const [editable, setEditable] = useState(false)

  const onChange = (event) => {
    setInputMessageValue(event.target.value)
  }

  const onCancel = () => {
    setInputMessageValue(message)
    setEditable(!editable)
  }

  const handleSave = () => {
    onSave(inputMessageValue, id)
    setEditable(!editable)
  }

  const handleKey = (event) => {
    if (event.keyCode === 13) {
      handleSave()
    }
  }

  const DeleteMessage = () => (
    <ConfirmationPopin
      title="Delete a message"
      content={(
        <>
          Are you sure you want to delete this message ? This cannot be undone.
          <Message
            id={id}
            img={img}
            name={name}
            message={message}
            date={date}
            modified={modified}
            className={styles.previewMessageDelete}
          />
        </>
      )}
      className="remove-member-modal"
      onOk={() => onDelete(id)}
      withCancel
      renderTrigger={({ show }) => (
        <i role="button" className={cn('fa fa-trash', styles.trash)} onClick={show} />
      )}
    />
  )

  return (
    <div className={cn(styles.wrapper, className)}>
      <Avatar src={img} name={name} size="medium" className={styles.avatar} />
      <div className={styles.messageContent}>
        <div className={styles.message}>
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>
            {distanceInWordsToNow(date, { addSuffix: true })}
          </span>
          <span className={styles.modified}>{modified && '(modified)'}</span>
          {allowEdit && <i role="button" className={cn('fa fa-pencil', styles.edit)} onClick={() => setEditable(!editable)} />}
          {allowEdit && <DeleteMessage />}
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
            onKeyUp={handleKey}
          />
          <Button secondary onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
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
  modified: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  allowEdit: PropTypes.bool,
  className: PropTypes.string,
}

Message.defaultProps = {
  img: undefined,
  className: undefined,
  modified: false,
  onSave: undefined,
  onDelete: undefined,
  allowEdit: false,
}

export default Message
