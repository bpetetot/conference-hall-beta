import { inject } from '@k-ramel/react'

import EditProposalForm from './form'

const mapState = (store, { eventId, onClose }) => {
  const { categories, formats } = store.data.events.get(eventId) || {}
  return {
    categories,
    formats,
    onSubmit: proposal => {
      store.dispatch({ type: '@@ui/ON_UPDATE_PROPOSAL', payload: { proposal } })
      onClose()
    },
  }
}

export default inject(mapState)(EditProposalForm)
