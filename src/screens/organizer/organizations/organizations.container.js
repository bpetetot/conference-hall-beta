import { compose } from 'redux'
import forRoute from 'hoc-little-router'

import Organizations from './organizations'

export default compose(forRoute.absolute('HOME_ORGANIZATION'))(Organizations)
