import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'

import EditForm from '../../meetup/form/meetupEdit.container'

const EditMeetupModal = ({ id, children }) => {
  return (
    <Modal renderTrigger={children}>{({ hide }) => <EditForm id={id} onFinish={hide} />}</Modal>
  )
}

EditMeetupModal.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string,
}

EditMeetupModal.defaultProps = {
  id: null,
}

export default EditMeetupModal
