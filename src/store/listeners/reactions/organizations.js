import { flow, set, unset } from 'immutadot'

import organizationCrud, { fetchUserOrganizations } from 'firebase/organizations'

export const create = async (action, store, { form, router }) => {
  const createForm = form('organization-create')
  const organizationValues = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create organization into database
  const newUserOrganization = flow(set(`members.${uid}`, true), set('owner', uid))(organizationValues)
  const ref = await createForm.asyncSubmit(organizationCrud.create, newUserOrganization)
  store.data.organizations.add({ id: ref.id, ...newUserOrganization })
  // go to organization page
  router.push('ORGANIZATION_PAGE', { organizationId: ref.id })
}

export const update = (action, store, { form, router }) => {
  const updateForm = form('organization-edit')
  const organization = updateForm.getFormValues()
  // create organization into database
  updateForm.asyncSubmit(organizationCrud.update, organization)
  // update organization into data store
  store.data.organizations.update(organization)
  // go to organization page
  router.push('ORGANIZATION_PAGE', { organizationId: organization.id })
}

export const get = async (action, store, { router }) => {
  const organizationId = action.payload || router.getPathParam('organizationId')
  if (!organizationId) return
  if (!store.data.organizations.hasKey(organizationId)) {
    const ref = await organizationCrud.read(organizationId)
    if (!ref.exists) return
    store.data.organizations.add({ id: organizationId, ...ref.data() })
  }
}

export const ofUser = async (action, store) => {
  const { uid } = store.auth.get()
  const organizations = await fetchUserOrganizations(uid)
  store.data.organizations.set(organizations.docs.map(ref => ({ id: ref.id, ...ref.data() })))
}

export const addMember = async (action, store, { router }) => {
  const { uid, organizationId } = action.payload
  const organization = store.data.organizations.get(organizationId)
  const updated = set(organization, `members.${uid}`, true)
  await organizationCrud.update(updated)
  store.data.organizations.update(updated)
  router.push('ORGANIZATION_PAGE', { organizationId })
}

export const removeMember = async (action, store, { router }) => {
  const { uid, organizationId } = action.payload
  const organization = store.data.organizations.get(organizationId)
  const updated = unset(organization, `members.${uid}`)
  await organizationCrud.update(updated)
  store.data.organizations.update(updated)
  router.push('ORGANIZATION_PAGE', { organizationId })
}
