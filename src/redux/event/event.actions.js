import { push } from 'redux-little-router'

import event from './event'
import { getUser } from '../auth'

export const saveEvent = data => async (dispatch, getState, fb) => {
  try {
    // add event to database
    const ref = await fb
      .firestore()
      .collection('events')
      .add({
        ...data,
        timestamp: fb.firestore.FieldValue.serverTimestamp(),
        owner: getUser(getState()).uid,
      })

    // go to event page
    dispatch(push(`/organizer/event/${ref.id}`))
  } catch (e) {
    console.error(e)
  }
}

export const getEvent = () => async (dispatch, getState, fb) => {
  // FIXME : get id from router (should not be there)
  const { id } = getState().router.params
  const current = event.get()(getState())
  if (current && current.id === id) {
    return
  }

  // wipe current event data in the store
  dispatch(event.reset())
  try {
    // get event from database
    const ref = await fb
      .firestore()
      .collection('events')
      .doc(id)
      .get()

    if (ref.exists) {
      dispatch(event.set({ id, ...ref.data() }))
    } else {
      console.error(`event with id ${id} not found`)
    }
  } catch (e) {
    console.error(e)
  }
}
