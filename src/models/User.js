class User {
  constructor(data = {}) {
    this.uid = data.uid
    this.bio = data.bio
    this.displayName = data.displayName
    this.photoURL = data.photoURL
    this.email = data.email
    this.betaAccess = data.betaAccess
    this.github = data.github
    this.address = data.address
    this.company = data.company
    this.createTimestamp = data.createTimestamp
    this.updateTimestamp = data.updateTimestamp
    this.language = data.language
    this.phone = data.phone
    this.speakerReference = data.speakerReference
    this.twitter = data.twitter
  }
}

export const userConverter = {
  toFirestore(user) {
    return { ...user }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return new User({ uid: snapshot.id, ...data })
  },
}

export default User
