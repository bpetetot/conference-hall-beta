import React from 'react'
import { compose } from 'redux'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { protect } from 'store/reducers/auth'
import AppLayout from 'layout'

import InvitePage from './invitePage'

const Invite = () => (
  <AppLayout>
    <InvitePage />
  </AppLayout>
)

export default compose(forRoute.absolute('invite'), protect)(Invite)
