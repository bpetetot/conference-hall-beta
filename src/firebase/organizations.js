import firebase from 'firebase/app'
import { set } from 'immutadot'

import crud from './crud'
import userCrud from './user'

const organizationCrud = crud('organizations', 'id')

export const createOrganization = async (organization, uid) => {
  const db = firebase.firestore()
  const batch = db.batch()

  const { id } = await organizationCrud.create(organization)

  // FIXME: https://github.com/bpetetot/conference-hall/issues/167
  const ref = await organizationCrud.read(id)
  const updatedOrganization = { id: ref.id, ...ref.data() }
  organizationCrud.update(updatedOrganization)

  const ref = await userCrud.read(uid)
  const updatedUser = set(ref.data(), `organizations.${organizationId}`, true)
  await userCrud.update(updatedUser)

  await batch.commit()

  return [updatedOrganization, updatedUser]
}

export default organizationCrud
