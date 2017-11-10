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
    console.error(e)
  }
}

export const getEvent = id => async (dispatch, getState, fb) => {
  try {
    // get event from database
    const ref = await fb
      .firestore()
      .collection('events')
      .get(id)

    if (ref.exists) {
      console.log(ref.data())
    } else {
      console.warn(`event with id ${id} not found`)
    }
  } catch (e) {
    console.error(e)
  }
}
