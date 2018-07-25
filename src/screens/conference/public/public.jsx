import React from 'react'
import forRoute from 'hoc-little-router'

import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'

import Event from './event'

const Public = () => (
  <AppLayout>
    <Event />
    <Contributors />
  </AppLayout>
)

export default forRoute('PUBLIC')(Public)
