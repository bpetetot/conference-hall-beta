import React from 'react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'

import Event from './event'

const Public = () => (
  <AppLayout fullwidth>
    <Event />
    <Contributors />
  </AppLayout>
)

export default forRoute('public')(Public)
