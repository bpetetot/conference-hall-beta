import { simpleObject } from 'k-ramel'

const defaultData = {
  initialized: false,
  authenticated: false,
  uid: undefined,
}

export default simpleObject({ defaultData })
