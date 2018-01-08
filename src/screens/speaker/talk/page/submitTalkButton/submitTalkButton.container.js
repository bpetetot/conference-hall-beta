import { connect } from 'react-redux'

import eventsData, { isCfpOpened } from 'redux/data/events'
import speakerApp from 'redux/ui/speaker/app'
import SubmitTalkButton from './submitTalkButton'

const mapState = (state) => {
  const { currentEventId } = speakerApp.get()(state)
  const { id, name } = eventsData.get(currentEventId)(state) || {}
  const cfpOpened = isCfpOpened(currentEventId)(state)
  return { eventId: id, eventName: name, cfpOpened }
}

export default connect(mapState)(SubmitTalkButton)
