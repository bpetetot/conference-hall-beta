import { compose } from 'redux'
import { connect } from 'react-redux'

import speakerTalks from 'redux/ui/speaker/myTalks'
import loader from 'components/loader'
import TalksSelection from './talksSelection'

const mapState = state => ({
  loaded: speakerTalks.isInitialized(state),
  talks: speakerTalks.getAsArray(state),
})

const mapDispatch = (dispatch, { eventId }) => ({
  load: () => {
    dispatch({ type: 'ON_LOAD_SPEAKER_TALK' })
  },
  onSelect: (talkId) => {
    dispatch({ type: 'OPEN_SUBMISSION_EVENTINFO_PAGE', payload: { eventId, talkId } })
  },
})

export default compose(
  connect(mapState, mapDispatch), //
  loader, //
)(TalksSelection)
