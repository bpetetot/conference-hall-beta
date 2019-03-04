import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../button'
import { Modal } from '../../../portals'
import { List, ListItem } from '../../../list'

const DayModal = ({ content }) => (
  <Modal
    renderTrigger={({ show }) => (
      <Button simple onClick={show}>{content.length - 2} other elements</Button>
    )}
  >
    {() => (
      <List
        array={content}
        renderRow={item => (
          <ListItem
            key={item}
            title={item}
          />
        )}
      />
    )}
  </Modal>
)

DayModal.propTypes = {
  content: PropTypes.array.isRequired,
}

export default DayModal
