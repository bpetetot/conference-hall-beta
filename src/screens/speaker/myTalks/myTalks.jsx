import React from 'react'
import { Link } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import MyTalksTable from './myTalksTable.container'

const MyTalks = () => (
  <div className="talks-page">
    <Titlebar icon="fa fa-microphone" title="My talks">
      <Link href="/speaker/talk/create" className="btn">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create talk" />
      </Link>
    </Titlebar>
    <MyTalksTable />
  </div>
)
export default forRoute('HOME_SPEAKER', { absolute: true })(MyTalks)
