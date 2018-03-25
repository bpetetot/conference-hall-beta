import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from './checkbox'

const ReduxFormCheckbox = ({ input, ...rest }) => <Checkbox {...input} {...rest} />

ReduxFormCheckbox.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default ReduxFormCheckbox
