import { inject } from '@k-ramel/react'

import TalkSelection from './talkSelection'

const mapStore = (store, { proposalId }, { router }) => {
  const currentProposalId = proposalId || router.getRouteParam('proposalId')
  const proposal = store.data.proposals.get(currentProposalId) || {}
  return {
    defaultValue: proposal.state,
    onChange: (e) => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_PROPOSAL',
        payload: {
          proposal: {
            id: currentProposalId,
            state: e.target.value,
          },
        },
      })
    },
  }
}

export default inject(mapStore)(TalkSelection)
