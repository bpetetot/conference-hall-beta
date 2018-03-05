import { keyValue } from 'k-ramel'

export default {
  users: keyValue({ key: 'uid' }),
  events: keyValue({ key: 'id' }),
  organizations: keyValue({ key: 'id' }),
  talks: keyValue({ key: 'id' }),
  proposals: keyValue({ key: 'id' }),
  ratings: keyValue({ key: 'uid' }),
}
