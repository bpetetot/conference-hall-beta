import { listen } from '@k-ramel/react'

import listeners from './proposals.listeners'
import Proposals from './proposals'

export default listen(listeners, 'PROPOSALS')(Proposals)
