import { simpleObject } from 'k-ramel'

const defaultData = {
  email: undefined,
  state: 'no-search',
  speakers: [],
}

export default simpleObject({ defaultData })
