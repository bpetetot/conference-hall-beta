import { inject } from '@k-ramel/react'

import TalkSelection from './talkSelection'

const mapStore = (store, { proposalId }, { router }) => {
  const eventId = router.getParam('eventId')
  const currentProposalId = proposalId || router.getParam('proposalId')
  const { emailStatus, state } = store.data.proposals.get(currentProposalId) || {}

  const isDeliberationDone =
    (!!emailStatus || emailStatus === 'none') &&
    (state === 'accepted' || state === 'rejected' || state === 'confirmed' || state === 'declined')

  return {
    eventId,
    isDeliberationDone,
    emailStatus,
    state,
    onChange: e => {
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
