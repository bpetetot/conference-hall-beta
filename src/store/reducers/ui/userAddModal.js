import { simpleObject } from 'k-ramel'

const defaultData = {
  email: undefined,
  state: 'no-search',
  users: [],
}

export default simpleObject({ defaultData })
