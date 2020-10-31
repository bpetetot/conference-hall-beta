import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import Page from 'features/organization/page'
import Form from 'features/organization/form'

const Organization = () => {
  return (
    <Routes>
      <Route path="/create" element={<Form />} />
      <Route path="/:organizationId" element={<Page />} />
      <Route path="/:organizationId/edit" element={<Form />} />
    </Routes>
  )
}

export default memo(Organization)
