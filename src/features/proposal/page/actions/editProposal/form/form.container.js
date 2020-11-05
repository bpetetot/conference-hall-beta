import { inject } from '@k-ramel/react'

import EditProposalForm from './form'

const mapState = (store, { eventId, onClose }) => {
  return {
    onSubmit: (proposal) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_PROPOSAL', payload: { eventId, proposal } })
      onClose()
    },
  }
}

export default inject(mapState)(EditProposalForm)
