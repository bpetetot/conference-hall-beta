import { simpleObject } from 'k-ramel'
import split from 'lodash/split'

const defaultData = {
  providers: split(process.env.REACT_APP_AUTH_PROVIDERS, ','),
  initialized: false,
  authenticated: false,
  uid: undefined,
}

export default simpleObject({ defaultData })
