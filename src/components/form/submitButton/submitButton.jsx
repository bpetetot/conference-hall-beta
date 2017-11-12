import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'

const SubmitButton = ({
  disabled, submitting, loadingMessage, className, children,
}) => (
  <button type="submit" className={cn('btn btn-primary', className)} disabled={disabled}>
    {submitting && <IconLabel icon="fa fa-cog fa-spin fa-fw" label={loadingMessage} />}
    {!submitting && children}
  </button>
)

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  loadingMessage: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SubmitButton.defaultProps = {
  disabled: false,
  submitting: false,
  className: undefined,
  loadingMessage: 'Loading...',
}

export default SubmitButton
