import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalToobar from './proposalsToolbar'

const countEmailsToSend = (type, selection = [], proposals = []) => {
  const result = proposals.filter((p) => selection.includes(p.id) && p.state === type)
  return result.length
}

const mapStore = (store, { userId, eventId }) => {
  const settings = store.data.eventsSettings.get(eventId)
  const { exporting } = store.ui.organizer.proposalsExport.get()
  const proposals = store.data.proposals.getAsArray()
  const totalProposals = proposals.length
  const { count, items: selection } = store.ui.organizer.proposalsSelection.get()

  const nbRejectedEmails = countEmailsToSend('rejected', selection, proposals)
  const nbAcceptedEmails = countEmailsToSend('accepted', selection, proposals)

  return {
    deliberationActive: get(settings, 'deliberation.enabled'),
    exporting,
    nbSelected: count,
    totalProposals,
    nbRejectedEmails,
    nbAcceptedEmails,
    onSelectAll: (e) =>
      store.dispatch({
        type: '@@ui/SELECT_ALL_PROPOSALS',
        payload: { checkAll: e.target.checked },
      }),
    onExportProposals: (output) => () =>
      store.dispatch({ type: '@@ui/EXPORT_PROPOSALS', payload: { output } }),
    onSendEmails: () =>
      store.dispatch({
        type: '@@ui/SEND_EMAIL_FOR_PROPOSALS',
        payload: { userId, eventId, selection },
      }),
    onAcceptProposals: () =>
      store.dispatch({ type: '@@ui/ACCEPT_PROPOSALS', payload: { userId, eventId, selection } }),
    onRejectProposals: () =>
      store.dispatch({ type: '@@ui/REJECT_PROPOSALS', payload: { userId, eventId, selection } }),
  }
}

export default inject(mapStore)(ProposalToobar)
