import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'

import ProposalEditForm from './form'
import styles from './edit.module.css'

const EditProposal = ({ event, proposal }) => (
  <Modal
    className={styles.modal}
    renderTrigger={({ show }) => (
      <Button secondary onClick={show}>
        <IconLabel icon="fa fa-pencil" label="Edit proposal" />
      </Button>
    )}
  >
    {({ hide }) => <ProposalEditForm event={event} proposal={proposal} onClose={hide} />}
  </Modal>
)

EditProposal.propTypes = {
  event: PropTypes.object.isRequired,
  proposal: PropTypes.object.isRequired,
}

export default EditProposal
