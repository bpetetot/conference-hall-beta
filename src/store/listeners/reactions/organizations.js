import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'

import organizationCrud from 'firebase/organizations'

// FIXME: change it when other operations will be implemented
// eslint-disable-next-line import/prefer-default-export
export const createOrganization = reaction(async (action, store, { form }) => {
  const createForm = form('organization-create')
  const organization = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create organization into database
  await createForm.asyncSubmit(organizationCrud.create, { ...organization, owner: uid })
  // FIXME: Go to newly created organization page
  // go to organization page
  store.dispatch(push('/organizer/organizations'))
})

