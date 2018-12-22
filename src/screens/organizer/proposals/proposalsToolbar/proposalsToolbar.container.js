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
    onChange: ({ target }) => {
      store.ui.organizer.proposals.update({ [target.id]: target.value })
    },
    onExportProposals: () => store.dispatch('@@ui/EXPORT_PROPOSALS'),
  }
}

export default inject(mapStore)(ProposalToobar)
