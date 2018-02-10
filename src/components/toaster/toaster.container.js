import { inject } from 'k-ramel/react'

import { getToasts } from 'redux/ui/toaster'
import Toaster from './toaster'

export default inject(store => ({
  toasts: getToasts(store.getState()),
}))(Toaster)
