/* eslint-disable import/prefer-default-export */
import { push } from 'redux-little-router'
import { getUser } from '../auth'

export const saveEvent = event => async (dispatch, getState, fb) => {
  try {
    // add event to database
    const ref = await fb
      .firestore()
      .collection('events')
      .add({
        ...event,
        timestamp: fb.firestore.FieldValue.serverTimestamp(),
        owner: getUser(getState()).uid,
      })

    // go to event page
    dispatch(push(`/organizer/event/${ref.id}`))
  } catch (e) {
    console.log(e)
  }
}
