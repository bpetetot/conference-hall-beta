import { types } from 'k-ramel'

export default {
  events: types.keyValue(),
  proposals: types.keyValue(),
  ratings: types.keyValue({ key: 'uid' }),
  users: types.keyValue({ key: 'uid' }),
  surveys: types.keyValue({ key: 'uid' }),
  eventsSettings: types.keyValue(),
}
