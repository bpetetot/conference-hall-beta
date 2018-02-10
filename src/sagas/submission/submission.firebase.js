/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app'
import { flow, unset } from 'immutadot'

import talksCrud from '../talks/talks.firebase'
import { updateProposal, addProposal, removeProposal } from '../proposals/proposals.firebase'

/**
 * Save all data needed when submitting to an event
 * @param {object} talk talk data
 * @param {string} eventId event id
 * @param {object} talkDataForEvent data asked to the user about the submission
 */
export const saveTalkSubmission = async (talk, eventId, talkDataForEvent, isUpdate) => {
  const db = firebase.firestore()
  const batch = db.batch()

  // add submission to talk
  talksCrud.update({ id: talk.id, [`submissions.${eventId}`]: talkDataForEvent })

  // add or update proposal to event
  if (isUpdate) {
    updateProposal(eventId, talk, talkDataForEvent)
  } else {
    addProposal(eventId, talk, talkDataForEvent)
  }
  await batch.commit()
}

/**
 * Unsubmitting  talk from an event
 * @param {object} talk talk data
 * @param {string} eventId event id
 */
export const unsubmitTalk = async (talk, eventId) => {
  const db = firebase.firestore()
  const batch = db.batch()

  // remove submissions
  const updatedTalk = flow(
    unset(`submissions.${eventId}`),
    unset('state'),
  )(talk)
  talksCrud.update(updatedTalk)

  // remove proposal from event
  removeProposal(eventId, talk.id)

  await batch.commit()
  return updatedTalk
}
