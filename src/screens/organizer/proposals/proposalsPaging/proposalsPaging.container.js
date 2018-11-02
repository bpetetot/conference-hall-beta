import { inject } from '@k-ramel/react'

import ProposalsPaging from './proposalsPaging'

const mapStore = (store) => {
  const { page, itemsPerPage } = store.ui.organizer.proposalsPaging.get()
  const nbItems = store.data.proposals.getAsArray().length
  const nbPage = Math.ceil(nbItems / itemsPerPage)

  return {
    loaded: store.data.proposals.isInitialized(),
    nbItems,
    page,
    nbPage,
    onPageChange: newPage => store.ui.organizer.proposalsPaging.update({ page: newPage }),
  }
}

export default inject(mapStore)(ProposalsPaging)
