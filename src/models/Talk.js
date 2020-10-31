class Talk {
  constructor(data = {}) {
    this.id = data.id
    this.title = data.title
    this.abstract = data.abstract
    this.level = data.level
    this.language = data.language
    this.references = data.references
    this.owner = data.owner
    this.archived = data.archived
    this.speakers = data.speakers || {}
    this.submissions = data.submissions || {}
    this.updateTimestamp = data.updateTimestamp
    this.createTimestamp = data.createTimestamp
  }
}

export const talkConverter = {
  toFirestore(talk) {
    return talk
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return new Talk({ id: snapshot.id, ...data })
  },
}

export default Talk
