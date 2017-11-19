import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { propTypes } from 'redux-form'

import IconLabel from 'components/iconLabel'

const SubmitButton = ({
  handleSubmit,
  pristine,
  submitting,
  invalid,
  loadingMessage,
  className,
  children,
}) => (
  <button
    type="submit"
    className={cn('btn btn-primary', className)}
    onClick={handleSubmit}
    disabled={pristine || submitting || invalid}
  >
    {submitting && <IconLabel icon="fa fa-cog fa-spin fa-fw" label={loadingMessage} />}
    {!submitting && children}
  </button>
)

SubmitButton.propTypes = {
  ...propTypes,
  loadingMessage: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SubmitButton.defaultProps = {
  className: undefined,
  loadingMessage: 'Saving...',
}

export default SubmitButton
