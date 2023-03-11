import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import TalkPage from 'features/talk/page'
import TalkEdit from 'features/talk/form/talkEdit'
import TalkSubmission from 'features/submission/talkSubmission'

function Talk() {
  const { talkId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<TalkPage talkId={talkId} />} />
      <Route path="/edit" element={<TalkEdit talkId={talkId} />} />
      <Route path="/submission" element={<TalkSubmission talkId={talkId} />} />
    </Routes>
  )
}

export default memo(Talk)
