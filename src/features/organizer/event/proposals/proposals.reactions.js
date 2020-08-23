import toLower from 'lodash/toLower'
import deburr from 'lodash/deburr'

import * as firebase from 'firebase/proposals'
import userCrud from 'firebase/user'

/* Send email to a selection of proposals */
export const sendEmails = async (action, store) => {
  const { eventId, selection } = action.payload
  if (!selection) return

  for (let i = 0; i < selection.length; i += 1) {
    const proposal = store.data.proposals.get(selection[i])
    if (proposal.state === 'accepted' || proposal.state === 'rejected') {
      proposal.emailStatus = 'sending'
      firebase.updateProposal(eventId, proposal)
    }
  }
}

/* reject several proposals */
export const rejectProposals = async (action, store) => {
  const { eventId, selection } = action.payload
  if (!selection) return

  for (let i = 0; i < selection.length; i += 1) {
    const proposal = store.data.proposals.get(selection[i])
    if (proposal.emailStatus !== 'sent') {
      // do not allow change of deliberation when email marked as sent
      proposal.state = 'rejected'
      firebase.updateProposal(eventId, proposal)
    }
  }
}

/* accept several proposals */
export const acceptProposals = async (action, store) => {
  const { eventId, selection } = action.payload
  if (!selection) return

  for (let i = 0; i < selection.length; i += 1) {
    const proposal = store.data.proposals.get(selection[i])
    if (proposal.emailStatus !== 'sent') {
      // do not allow change of deliberation when email marked as sent
      proposal.state = 'accepted'
      firebase.updateProposal(eventId, proposal)
    }
  }
}

/* select a proposal to send email */
export const addProposalToSelection = async (action, store) => {
  const proposalsSelection = store.ui.organizer.proposalsSelection.get()
  const proposals = proposalsSelection.items
  const { proposalId } = action.payload
  if (proposals.includes(proposalId)) {
    store.ui.organizer.proposalsSelection.update({
      count: proposals.length - 1,
      items: proposals.filter((val) => val !== proposalId),
    })
  } else {
    store.ui.organizer.proposalsSelection.update({
      count: proposals.length + 1,
      items: [...proposals, proposalId],
    })
  }
}

/* select a all proposal to send email */
export const selectAllProposal = async (action, store) => {
  const isChecked = action.payload.checkAll
  if (isChecked) {
    const proposalKeys = store.data.proposals.getKeys()
    const emailNotSent = proposalKeys.filter(
      (val) =>
        store.data.proposals.get(val).emailStatus !== 'delivered' &&
        store.data.proposals.get(val).emailStatus !== 'sending',
    )
    store.ui.organizer.proposalsSelection.update({
      count: emailNotSent.length,
      items: emailNotSent,
    })
  } else {
    // deselect all
    store.ui.organizer.proposalsSelection.update({
      count: 0,
      items: [],
    })
  }
}

/* load proposals */
export const loadProposals = async (action, store) => {
  store.data.proposals.reset()
  store.ui.organizer.proposalsPaging.reset()

  const { userId, eventId, filters } = action.payload

  const proposals = await firebase.fetchEventProposals(eventId, userId, filters)
  let props = await Promise.all(
    proposals.map(async (proposal) => {
      const prop = { ...proposal }
      const speakerList = Object.keys(prop.speakers)
      const speakerNameList = await Promise.all(
        speakerList.map(async (speakerUid) => {
          // check if user already in the store
          const userCache = store.data.users.get(speakerUid)
          if (userCache) return userCache.displayName
          // Not in the store so fetching user in database
          const user = await userCrud.read(speakerUid)
          store.data.users.add(user.data())
          return user.data().displayName
        }),
      )
      prop.speakerName = speakerNameList.join(' & ')
      return prop
    }),
  )
  // Cross-fields search better handled in UI than firebase
  const { search } = filters
  if (search) {
    const searchQuery = deburr(toLower(search))
    props = props.filter(
      (proposal) =>
        deburr(toLower(proposal.title)).includes(searchQuery) ||
        deburr(toLower(proposal.speakerName)).includes(searchQuery),
    )
  }
  store.data.proposals.set(props)
}

/* select a proposal */
export const selectProposal = async (action, store, { router }) => {
  const { eventId, proposalId } = action.payload
  const proposalKeys = store.data.proposals.getKeys()
  const proposalIndex = proposalKeys.indexOf(proposalId)

  if (proposalIndex !== -1) {
    store.ui.organizer.proposal.set({ proposalIndex })
    const filters = store.ui.organizer.proposals.get()
    router.push('organizer-event-proposal-page', { eventId, proposalId }, { ...filters })
  }
}
