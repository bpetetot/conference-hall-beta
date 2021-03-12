import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import TalkPage from 'features/talk/page'
import TalkEdit from 'features/talk/form/talkEdit'
import SubmitEventSelection from 'features/submission/selection-event'

const Talk = () => (
  <Routes>
    <Route path="/" element={<TalkPage />} />
    <Route path="/edit" element={<TalkEdit />} />
    <Route path="/submission" element={<SubmitEventSelection />} />
  </Routes>
)

export default memo(Talk)
