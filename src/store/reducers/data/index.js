import { types } from 'k-ramel'

export default {
  events: types.keyValue(),
  organizations: types.keyValue(),
  proposals: types.keyValue(),
  talks: types.keyValue(),
  ratings: types.keyValue({ key: 'uid' }),
  users: types.keyValue({ key: 'uid' }),
  surveys: types.keyValue({ key: 'uid' }),
  meetups: types.keyValue(),
}
