import React, { memo } from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { protect } from 'features/auth'
import AppLayout from 'layout'

import InvitePage from './invitePage'

const Invite = () => (
  <AppLayout>
    <InvitePage />
  </AppLayout>
)

export default compose(memo, forRoute.absolute('invite'), protect)(Invite)
