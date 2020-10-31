/* eslint-disable max-classes-per-file */
import mapValues from 'lodash/mapValues'
import { toDate } from 'helpers/firebase'

export const FILTERS = {
  ALL: 'all',
  ARCHIVED: 'archived',
  ACTIVE: 'active',
}

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

class Submission extends Talk {
  constructor(data = {}) {
    super(data)
    this.state = data.state
    this.formats = data.formats
    this.categories = data.categories
  }
}

export const talkConverter = {
  toFirestore(talk) {
    return talk
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    const submissions = mapValues(data.submissions, (s) => new Submission(s))
    return new Talk({
      id: snapshot.id,
      ...data,
      submissions,
      updateTimestamp: toDate(data.updateTimestamp),
      createTimestamp: toDate(data.createTimestamp),
    })
  },
}

export default Talk
