import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'
import map from 'lodash/map'

import { getRouterParam } from 'store/reducers/router'
import organizationCrud, { createOrganization as firebaseCreateOrganization } from 'firebase/organizations'
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
  const current = store.data.organizations.get(organizationId)
  if (current && current.id === organizationId) return
  // fetch event from id
  const ref = await organizationCrud.read(organizationId)
  if (ref.exists) {
    store.data.organizations.add({ id: organizationId, ...ref.data() })
  }
})
