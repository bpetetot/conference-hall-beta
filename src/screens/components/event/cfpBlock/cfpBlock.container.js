import { inject } from '@k-ramel/react'
import firebase from 'firebase/app'

import { getCfpState } from 'store/reducers/data/events.selector'
import CfpBlock from './cfpBlock'

const mapStore = (store, { eventId }) => {
  const { type, cfpDates, deliberationDate } = store.data.events.get(eventId)

  const getCfpStateFunction = firebase.functions().httpsCallable('getCfpState')
  getCfpStateFunction({ eventId }).then(console.log)

  return {
    cfpState: getCfpState(eventId)(store),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default inject(mapStore)(CfpBlock)
