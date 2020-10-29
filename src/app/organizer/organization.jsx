import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import OrganizationPage from 'features/organization/page'
import OrganizationEdit from 'features/organization/form/organizationEdit.container'

const Organization = () => {
  const { organizationId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<OrganizationPage organizationId={organizationId} />} />
      <Route path="/edit" element={<OrganizationEdit organizationId={organizationId} />} />
    </Routes>
  )
}

export default memo(Organization)
