/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import loader from 'components/loader'
import Proposal from './proposal'

const mapStore = (store, { eventId, proposalId }) => {
  const proposal = store.data.proposals.get(proposalId)
  const event = store.data.events.get(eventId)
  const settings = store.data.eventsSettings.get(eventId)

  return {
    loaded: !!proposal && !!event,
    proposal,
    eventId,
    deliberationActive: get(settings, 'deliberation.enabled'),
    blindRating: get(settings, 'deliberation.blindRating'),
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_PROPOSAL', payload: { eventId, proposalId } })
    },
  }
}

const ProposalContainer = compose(inject(mapStore), loader)(Proposal)

function ProposalPage(props) {
  const { proposalId } = useParams()
  return <ProposalContainer {...props} proposalId={proposalId} />
}

export default ProposalPage
