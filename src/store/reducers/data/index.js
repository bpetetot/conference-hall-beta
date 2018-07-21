import { types } from 'k-ramel'

export default {
  events: types.keyValue({ key: 'id' }),
  organizations: types.keyValue({ key: 'id' }),
  proposals: types.keyValue({ key: 'id' }),
  ratings: types.keyValue({ key: 'uid' }),
  talks: types.keyValue({ key: 'id' }),
  users: types.keyValue({ key: 'uid' }),
  surveys: types.keyValue({ key: 'uid' }),
}
