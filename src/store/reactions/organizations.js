import { flow, set, unset } from 'immutadot'

import organizationCrud, { fetchUserOrganizations } from 'firebase/organizations'
import { ROLES } from 'firebase/constants'

export const create = async (action, store) => {
  const { userId, data } = action.payload
  const newUserOrganization = flow(
    set(`members.${userId}`, ROLES.OWNER),
    set(ROLES.OWNER, userId),
  )(data)

  store.ui.loaders.update({ isOrganizationSaving: true })
  const ref = await organizationCrud.create(newUserOrganization)
  store.ui.loaders.update({ isOrganizationSaving: false })

  store.data.organizations.add({ id: ref.id, ...newUserOrganization })
}

export const update = async (action, store) => {
  const data = action.payload

  store.ui.loaders.update({ isOrganizationSaving: true })
  await organizationCrud.update(data)
  store.ui.loaders.update({ isOrganizationSaving: false })

  store.data.organizations.update(data)
}

export const get = async (action, store) => {
  const { organizationId } = action.payload
  if (!organizationId) return
  if (!store.data.organizations.hasKey(organizationId)) {
    const ref = await organizationCrud.read(organizationId)
    if (!ref.exists) return
    store.data.organizations.add({ id: organizationId, ...ref.data() })
  }
}

export const ofUser = async (action, store) => {
  const { userId } = action.payload
  const organizations = await fetchUserOrganizations(userId)
  store.data.organizations.set(organizations)
}

export const setMember = async (action, store) => {
  const { uid, organizationId, role } = action.payload
  const organization = store.data.organizations.get(organizationId)
  const updated = set(organization, `members.${uid}`, role || ROLES.REVIEWER)
  await organizationCrud.update(updated)
  store.data.organizations.update(updated)
}

export const removeMember = async (action, store) => {
  const { uid, organizationId, leave } = action.payload
  const organization = store.data.organizations.get(organizationId)
  const updated = unset(organization, `members.${uid}`)
  if (!leave) {
    await organizationCrud.update(updated)
  }
  store.data.organizations.update(updated)
}
