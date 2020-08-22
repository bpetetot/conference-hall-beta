import React, { memo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import TalkPage from './page'
import TalkEdit from './form/talkEdit'

const Talk = () => {
  const { talkId } = useParams()
  return (
    <Routes>
      <Route path="/" element={<TalkPage talkId={talkId} />} />
      <Route path="/edit" element={<TalkEdit talkId={talkId} />} />
    </Routes>
  )
}

export default memo(Talk)
