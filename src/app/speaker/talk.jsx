import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import Page from 'features/talk/page'
import Form from 'features/talk/form'
import SubmitWizard from 'features/submission/wizard-talk'

const Talk = () => {
  return (
    <Routes>
      <Route path="/create" element={<Form />} />
      <Route path="/:talkId" element={<Page />} />
      <Route path="/:talkId/edit" element={<Form />} />
      <Route path="/:talkId/submission" element={<SubmitWizard />} />
    </Routes>
  )
}

export default memo(Talk)
