import { types } from 'k-ramel'

export default {
  proposals: types.keyValue(),
  ratings: types.keyValue({ key: 'uid' }),
}
