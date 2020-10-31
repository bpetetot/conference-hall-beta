/* eslint-disable max-classes-per-file */
import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import { toDate } from 'helpers/firebase'

export const FILTERS = {
  ALL: 'all',
  ARCHIVED: 'archived',
  ACTIVE: 'active',
}

export const SUBMISSION_STATES = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
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

  getSubmission = (eventId) => this.submissions?.[eventId]

  isSubmitted = (eventId) => !!this.getSubmission(eventId) ?? false

  isSubmissionOutOfDate = (eventId) => {
    if (!this.isSubmitted(eventId)) return false
    const comparedFields = ['title', 'abstract', 'level', 'references', 'speakers']
    const currentTalk = pick(this, comparedFields)
    const submittedTalk = pick(this.getSubmission(eventId), comparedFields)
    return !isEqual(currentTalk, submittedTalk)
  }
}

class Submission extends Talk {
  constructor(data = {}) {
    super(data)
    this.state = data.state
    this.formats = data.formats
    this.categories = data.categories
  }

  isAccepted = () => this.state === SUBMISSION_STATES.ACCEPTED

  isRejected = () => this.state === SUBMISSION_STATES.REJECTED

  isConfirmed = () => this.state === SUBMISSION_STATES.CONFIRMED

  isDeclined = () => this.state === SUBMISSION_STATES.DECLINED
}

export const talkConverter = {
  toFirestore(talk) {
    const submissions = mapValues(talk.submissions, (s) => ({ ...s }))
    return { ...talk, submissions }
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
