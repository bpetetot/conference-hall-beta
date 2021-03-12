import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import OrganizationPage from 'features/organization/page'
import OrganizationEdit from 'features/organization/form/organizationEdit'

const Organization = () => (
  <Routes>
    <Route path="/" element={<OrganizationPage />} />
    <Route path="/edit" element={<OrganizationEdit />} />
  </Routes>
)

export default memo(Organization)
