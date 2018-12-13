import { inject } from '@k-ramel/react'

import TalkSelection from './talkSelection'

const mapStore = (store, { proposalId }, { router }) => {
  const currentProposalId = proposalId || router.getRouteParam('proposalId')
  const { state } = store.data.proposals.get(currentProposalId) || {}

  const isDeliberationDone = state === 'accepted' || state === 'rejected' || state === 'confirmed' || state === 'declined'

  return {
    isDeliberationDone,
    state,
    onChange: (e) => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_PROPOSAL',
        payload: {
          proposal: {
            id: currentProposalId,
            state: e.target.value,
          },
          options: { updateTimestamp: false },
        },
      })
    },
  }
}

export default inject(mapStore)(TalkSelection)
