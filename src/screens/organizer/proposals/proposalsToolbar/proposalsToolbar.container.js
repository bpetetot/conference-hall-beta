import { inject } from '@k-ramel/react'

import ProposalToobar from './proposalsToolbar'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const sortOrders = router.getParam('sortOrders')
  const ratings = router.getParam('ratings')
  const statuses = router.getParam('statuses')
  const { deliberationActive, formats, categories } = store.data.events.get(eventId) || {}
  const filters = store.ui.organizer.proposals.get()
  const { isExporting } = store.ui.organizer.proposalsExport.get()

  return {
    statuses,
    ratings,
    formats,
    categories,
    sortOrders,
    filters,
    deliberationActive,
    isExporting,
    onRefresh: () => {
      store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS')
    },
    onChange: ({ target }) => {
      store.ui.organizer.proposals.update({ [target.id]: target.value })
    },
    onSelectAll: (isChecked) => {
      store.dispatch({ type: '@@ui/SELECT_ALL_PROPOSALS', payload: { checkAll: isChecked } })
    },
    onExportProposals: () => store.dispatch('@@ui/EXPORT_PROPOSALS'),
    onSendEmails: selection => store.dispatch({ type: '@@ui/SEND_EMAIL_FOR_PROPOSALS', payload: { selection } }),
    onAcceptProposals: selection => store.dispatch({ type: '@@ui/ACCEPT_PROPOSALS', payload: { selection } }),
    onRejectProposals: selection => store.dispatch({ type: '@@ui/REJECT_PROPOSALS', payload: { selection } }),
  }
}

export default inject(mapStore)(ProposalToobar)
