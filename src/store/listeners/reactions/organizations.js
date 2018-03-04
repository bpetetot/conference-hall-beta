import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'
import map from 'lodash/map'
import { set } from 'immutadot'

import { getRouterParam } from 'store/reducers/router'
import organizationCrud, {
  createOrganization as firebaseCreateOrganization,
  fetchOrganizationUsers,
} from 'firebase/organizations'
import userCrud from 'firebase/user'

export const createOrganization = reaction(async (action, store, { form }) => {
  const createForm = form('organization-create')
  const organizationValues = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create organization into database
  const [organization, user] = await createForm.asyncSubmit(
    firebaseCreateOrganization,
    organizationValues,
    uid,
  )

  store.data.organizations.add(organization)
  store.data.users.addOrUpdate(user)

  // FIXME: Go to newly created organization page
  // go to organization page
  store.dispatch(push('/organizer/organizations'))
})

export const fetchOrganizerOrganizations = reaction(async (action, store) => {
  const { uid } = store.auth.get()

  let user = store.data.users.get(uid)
  if (!user) {
    const ref = await userCrud.read(uid)
    user = { id: ref.id, ...ref.data() }
    store.data.users.add(user)
  }

  const organizerOrganizations = await Promise.all(map(
    user.organizations,
    async (value, organizationId) => {
      let organization = store.data.organizations.get(organizationId)

      if (!organization) {
        const ref = await organizationCrud.read(organizationId)
        organization = { id: organizationId, ...ref.data() }
        store.data.organizations.add(organization)
      }

      return organization
    },
  ))

  store.ui.organizer.myOrganizations.reset()
  store.ui.organizer.myOrganizations.set(organizerOrganizations)
})


export const fetchOrganization = reaction(async (action, store) => {
  const organizationId = action.payload || getRouterParam('organizationId')(store.getState())
  if (!organizationId) return
  // check if already in the store
  let organization = store.data.organizations.get(organizationId)
  const isAlreadyInStore = organization && organization.id === organizationId

  if (!isAlreadyInStore) {
    // fetch event from id
    const ref = await organizationCrud.read(organizationId)
    organization = { id: organizationId, ...ref.data() }
    if (ref.exists) {
      await store.data.organizations.add(organization)
    }
  }

  const result = await fetchOrganizationUsers(organizationId)
  const users = result.docs.map(userRef => ({ id: userRef.id, ...userRef.data() }))

  store.data.organizations.update(set(organization, 'users', users))
})
