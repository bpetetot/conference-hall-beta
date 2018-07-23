import { types } from 'k-ramel'

const defaultData = {
  email: undefined,
  state: 'no-search',
  users: [],
}

export default types.object({ defaultData })
