import { inject } from '@k-ramel/react'

import TalkSelection from './talkSelection'

const mapStore = (store, { proposalId }, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const { sendDeliberationEmails } = store.data.events.get(eventId) || {}

  const currentProposalId = proposalId || router.getRouteParam('proposalId')
  const { state } = store.data.proposals.get(currentProposalId) || {}

  const disabled = sendDeliberationEmails && (state === 'accepted' || state === 'rejected')

  return {
    sendDeliberationEmails,
    defaultValue: state,
    disabled,
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
