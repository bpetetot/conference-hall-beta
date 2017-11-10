import { connect } from 'react-redux'

import Event from './event'

const mapState = () => ({
  initialValues: { name: 'test' },
})

const mapDispatch = () => ({
  onSubmit: (values) => {
    console.log(values)
  },
})

export default connect(mapState, mapDispatch)(Event)
