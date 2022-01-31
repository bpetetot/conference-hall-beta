import { getEventCfpState } from 'store/reducers/data/events.selector'

/**
 * Lists open events for a speaker.
 */
export default (store) =>
  store.ui.speaker.myEvents.getAsArray().filter((event) => getEventCfpState(event) === 'open')
