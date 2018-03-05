import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'

import { createOrganization as firebaseCreateOrganization } from 'firebase/organizations'

// FIXME: change it when other operations will be implemented
// eslint-disable-next-line import/prefer-default-export
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

