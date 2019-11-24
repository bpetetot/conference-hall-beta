import { inject } from '@k-ramel/react'

import { getEventCfpState } from 'store/reducers/data/events.selector'
import CfpBadge from './cfpBadge'

const mapStore = (store, { name, type, cfpDates, cfpOpened }) => ({
  cfpState: getEventCfpState({
    name,
    type,
    cfpDates,
    cfpOpened,
  }),
})

export default inject(mapStore)(CfpBadge)
