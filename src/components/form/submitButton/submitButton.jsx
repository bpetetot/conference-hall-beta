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
  noPristine,
}) => (
  <button
    type="submit"
    className={cn('btn btn-primary', className)}
    onClick={handleSubmit}
    disabled={(!noPristine && pristine) || submitting || invalid}
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
  noPristine: PropTypes.bool,
}

SubmitButton.defaultProps = {
  className: undefined,
  loadingMessage: 'Saving...',
  noPristine: false,
}

export default SubmitButton
