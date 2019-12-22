import { inject } from '@k-ramel/react'

import MemberRow from './memberRow'

const mapStore = (store, _, { router }) => ({
  organizationId: router.getParam('organizationId'),
})

export default inject(mapStore)(MemberRow)
