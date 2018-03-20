import { keyValue } from 'k-ramel'

export default {
  events: keyValue({ key: 'id' }),
  organizations: keyValue({ key: 'id' }),
  proposals: keyValue({ key: 'id' }),
  ratings: keyValue({ key: 'uid' }),
  talks: keyValue({ key: 'id' }),
  users: keyValue({ key: 'uid' }),
}
