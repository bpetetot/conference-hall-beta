import { keyValue } from 'k-ramel'

export default {
  allEvents: keyValue({ key: 'id' }),
  events: keyValue({ key: 'id' }),
  proposals: keyValue({ key: 'id' }),
  ratings: keyValue({ key: 'uid' }),
  talks: keyValue({ key: 'id' }),
  users: keyValue({ key: 'uid' }),
}
