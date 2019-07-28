import flow from 'lodash/fp/flow'
import isEqual from 'lodash/fp/isEqual'
import omit from 'lodash/fp/omit'
import over from 'lodash/fp/over'
import pick from 'lodash/fp/pick'
import update from 'lodash/fp/update'
import pickBy from 'lodash/fp/pickBy'
import toLower from 'lodash/toLower'
import deburr from 'lodash/deburr'

import * as firebase from 'firebase/proposals'
import userCrud from 'firebase/user'

/* set proposal filters from URL query params */
export const setProposalFiltersFromRouter = (action, store, { router }) => {
  const query = router.getQueryParams()

  const pickTruthyValues = pickBy(Boolean)
  const pickFilterKeys = pick(['state', 'ratings', 'categories', 'formats', 'sortOrder', 'search'])
  const ensureIncludedIn = values => value => (values.includes(value) ? value : values[0])

  const filtersFromRouterState = pickFilterKeys(query)
  const filtersFromUiState = pickTruthyValues(pickFilterKeys(store.ui.organizer.proposals.get()))
  const filtersFromBothStates = { ...filtersFromUiState, ...filtersFromRouterState }

  const availableSortOrders = router.getParam('sortOrders')
  const validFilters = update(
    'sortOrder',
    ensureIncludedIn(availableSortOrders),
    filtersFromBothStates,
  )

  if (!isEqual(validFilters, filtersFromRouterState)) {
    const route = router.getCurrentCode()
    const pathParams = router.getPathParams()
    router.replace(route, pathParams, { ...query, ...validFilters })
  }
  if (!isEqual(validFilters, filtersFromUiState)) {
    store.ui.organizer.proposals.update(validFilters)
  }
}

/* Send email to a selection of proposals */
export const sendEmails = async (action, store, { router }) => {
  const { selection } = action.payload
  if (!selection) return

  const eventId = router.getParam('eventId')
  for (let i = 0; i < selection.length; i += 1) {
    const proposal = store.data.proposals.get(selection[i])
    if (proposal.state === 'accepted' || proposal.state === 'rejected') {
      proposal.emailStatus = 'sending'
      firebase.updateProposal(eventId, proposal)
    }
  }
  store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS')
}

/* reject several proposals */
export const rejectProposals = async (action, store, { router }) => {
  const { selection } = action.payload
  if (!selection) return

  const eventId = router.getParam('eventId')
  for (let i = 0; i < selection.length; i += 1) {
    const proposal = store.data.proposals.get(selection[i])
    if (proposal.emailStatus !== 'sent') {
      // do not allow change of deliberation when email marked as sent
      proposal.state = 'rejected'
      firebase.updateProposal(eventId, proposal)
    }
  }
  store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS')
}

/* accept several proposals */
export const acceptProposals = async (action, store, { router }) => {
  const { selection } = action.payload
  if (!selection) return

  const eventId = router.getParam('eventId')
  for (let i = 0; i < selection.length; i += 1) {
    const proposal = store.data.proposals.get(selection[i])
    if (proposal.emailStatus !== 'sent') {
      // do not allow change of deliberation when email marked as sent
      proposal.state = 'accepted'
      firebase.updateProposal(eventId, proposal)
    }
  }
  store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS')
}

/* select a proposal to send email */
export const addProposalToSelection = async (action, store) => {
  const proposalsSelection = store.ui.organizer.proposalsSelection.get()
  const proposals = proposalsSelection.items
  const { proposalId } = action.payload
  if (proposals.includes(proposalId)) {
    store.ui.organizer.proposalsSelection.update({
      count: proposals.length - 1,
      items: proposals.filter(val => val !== proposalId),
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
      val => store.data.proposals.get(val).emailStatus !== 'delivered'
        && store.data.proposals.get(val).emailStatus !== 'sending',
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
export const loadProposals = async (action, store, { router }) => {
  store.data.proposals.reset()
  store.ui.organizer.proposalsPaging.reset()

  const eventId = router.getParam('eventId')
  const { uid } = store.auth.get()

  const filters = store.ui.organizer.proposals.get()
  const proposals = await firebase.fetchEventProposals(eventId, uid, filters)
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
      proposal => deburr(toLower(proposal.title)).includes(searchQuery)
        || deburr(toLower(proposal.speakerName)).includes(searchQuery),
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

/* when filters changes synchronize filters with url and load proposals */
export const changeFilter = async (action, store, { router }) => {
  const [removedFilters, addedOrModifiedFilters] = over([
    flow(
      pickBy(filter => !filter),
      Object.keys,
    ),
    pickBy(filter => filter),
  ])(action.payload)

  const query = router.getQueryParams()
  const updatedQuery = flow(
    omit(removedFilters),
    filters => ({
      ...filters,
      ...addedOrModifiedFilters,
    }),
  )(query)

  if (!isEqual(query, updatedQuery)) {
    const route = router.getCurrentCode()
    const pathParams = router.getPathParams()
    router.replace(route, pathParams, updatedQuery)
    store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS')
  }
}
