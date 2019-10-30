import { getEventCfpState } from 'store/reducers/data/events.selector'

/**
 * Lists opened events for a speaker.
 */
export default (store) => store.ui.speaker.myEvents.getAsArray().filter((event) => getEventCfpState(event) === 'opened')
