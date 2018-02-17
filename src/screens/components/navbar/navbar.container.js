import { inject } from '@k-ramel/react'

import Navbar from './navbar'

export default inject(({ dispatch }) => ({
  signout: () => dispatch({ type: 'SIGNOUT' }),
}))(Navbar)
