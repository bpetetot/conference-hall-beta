import { inject } from '@k-ramel/react'

import ProposalToobar from './proposalsToolbar'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const { deliberationActive } = store.data.events.get(eventId) || {}
  const { exporting } = store.ui.organizer.proposalsExport.get()
  const { count } = store.ui.organizer.proposalsSelection.get()
  const totalProposals = store.data.proposals.getAsArray().length
  const { items: selection } = store.ui.organizer.proposalsSelection.get()

  return {
    deliberationActive,
    exporting,
    nbSelected: count,
    totalProposals,
    onSelectAll: e => store.dispatch({
      type: '@@ui/SELECT_ALL_PROPOSALS',
      payload: { checkAll: e.target.checked },
    }),
    onExportProposals: output => () => store.dispatch({ type: '@@ui/EXPORT_PROPOSALS', payload: { output } }),
    onSendEmails: () => store.dispatch({ type: '@@ui/SEND_EMAIL_FOR_PROPOSALS', payload: { selection } }),
    onAcceptProposals: () => store.dispatch({ type: '@@ui/ACCEPT_PROPOSALS', payload: { selection } }),
    onRejectProposals: () => store.dispatch({ type: '@@ui/REJECT_PROPOSALS', payload: { selection } }),
  }
}

export default inject(mapStore)(ProposalToobar)
