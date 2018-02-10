import { inject } from 'k-ramel/react'
import { compose } from 'redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'
import { protect } from 'redux/auth'

import Speaker from './speaker'

const mapStore = ({ dispatch }) => ({
  load: () => dispatch({ type: 'SPEAKER/INIT_APP' }),
})

export default compose(forRoute('HOME_SPEAKER'), protect, inject(mapStore), loader())(Speaker)
