import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'

import CreateForm from '../../meetup/form/meetupCreate.container'

const CreateMeetupModal = ({ date, children }) => {
  return (
    <Modal renderTrigger={children}>
      {({ hide }) => <CreateForm date={date} onFinish={hide} />}
    </Modal>
  )
}

CreateMeetupModal.propTypes = {
  children: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
}

CreateMeetupModal.defaultProps = {
  date: undefined,
}

export default CreateMeetupModal
