import { types } from 'k-ramel'

const defaultData = {
  query: undefined,
  date: new Date(),
  location: undefined,
  loading: false,
  totalConferences: 0,
  conferences: [],
  totalMeetups: 0,
  meetups: [],
}

export default types.object({ defaultData })
