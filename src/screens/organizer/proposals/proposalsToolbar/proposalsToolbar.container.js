import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalToobar from './proposalsToolbar'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const settings = store.data.eventsSettings.get(eventId)
  const { exporting } = store.ui.organizer.proposalsExport.get()
  const { count } = store.ui.organizer.proposalsSelection.get()
  const totalProposals = store.data.proposals.getAsArray().length
  const { items } = store.ui.organizer.proposalsSelection.get()

  return {
    deliberationActive: get(settings, 'deliberation.enabled'),
    exporting,
    nbSelected: count,
    totalProposals,
    selection: items,
    onSelectAll: (isChecked) => {
      store.dispatch({ type: '@@ui/SELECT_ALL_PROPOSALS', payload: { checkAll: isChecked } })
    },
    onExportProposals: output => () => store.dispatch({ type: '@@ui/EXPORT_PROPOSALS', payload: { output } }),
    onSendEmails: selection => store.dispatch({ type: '@@ui/SEND_EMAIL_FOR_PROPOSALS', payload: { selection } }),
    onAcceptProposals: selection => store.dispatch({ type: '@@ui/ACCEPT_PROPOSALS', payload: { selection } }),
    onRejectProposals: selection => store.dispatch({ type: '@@ui/REJECT_PROPOSALS', payload: { selection } }),
  }
}

export default inject(mapStore)(ProposalToobar)
