import { connect } from 'react-redux'

import eventsData from 'redux/data/events'
import speakerApp from 'redux/ui/speaker/app'
import SubmitTalk from './submitTalk'

const mapState = (state) => {
  const { currentEventId } = speakerApp.get()(state)
  const { id, name } = eventsData.get(currentEventId)(state) || {}
  return { eventId: id, eventName: name }
}

export default connect(mapState)(SubmitTalk)
