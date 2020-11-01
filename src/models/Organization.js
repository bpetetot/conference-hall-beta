import { toDate } from 'helpers/firebase'

class Organization {
  constructor(data = {}) {
    this.id = data.id
    this.name = data.name
    this.owner = data.owner
    this.members = data.members
    this.updateTimestamp = data.updateTimestamp
    this.createTimestamp = data.createTimestamp
  }
}

export const organizationConverter = {
  toFirestore(organization) {
    return organization
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return new Organization({
      id: snapshot.id,
      ...data,
      updateTimestamp: toDate(data.updateTimestamp),
      createTimestamp: toDate(data.createTimestamp),
    })
  },
}

export default Organization
