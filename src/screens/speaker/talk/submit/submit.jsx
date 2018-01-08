import React from 'react'
import forRoute from 'hoc-little-router'

import Titlebar from 'components/titlebar'

const TalkSubmit = () => (
  <div>
    <Titlebar icon="fa fa-paper-plane" title="Submit talk to..." />
    <div>
      <small>Not implemented yet !</small>
    </div>
  </div>
)

export default forRoute('TALK_SUBMIT')(TalkSubmit)
