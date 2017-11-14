import { connect } from 'react-redux'

import withRoute from 'components/withRoute'
import EventEdit from './eventForm'

const mapState = () => ({
  form: 'event-create',
})

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, form: 'event-create' },
    }),
})

export default withRoute(connect(mapState, mapDispatch)(EventEdit))
