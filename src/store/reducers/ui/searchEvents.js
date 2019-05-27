import { types } from 'k-ramel'

const defaultData = {
  query: undefined,
  nbHitsConferences: 0,
  loadingConferences: false,
  conferences: [],
  nbHitsMeetups: 0,
  loadingMeetups: false,
  meetups: [],
}

export default types.object({ defaultData })
