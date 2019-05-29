import { types } from 'k-ramel'

const defaultData = {
  loading: false,
  totalConferences: 0,
  conferences: [],
  totalMeetups: 0,
  meetups: [],
}

export default types.object({ defaultData })
