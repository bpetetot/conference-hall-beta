import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'

const SubmitButton = ({
  type,
  onClick,
  handleSubmit,
  pristine,
  submitting,
  invalid,
  loadingMessage,
  className,
  children,
  secondary,
}) => (
  <Button
    type={type}
    onClick={onClick || handleSubmit}
    className={className}
    accent={!secondary}
    secondary={secondary}
    disabled={pristine || submitting || invalid}
  >
    {submitting && <IconLabel icon="fa fa-cog fa-spin fa-fw" label={loadingMessage} />}
    {!submitting && children}
  </Button>
)

SubmitButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  loadingMessage: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
}

SubmitButton.defaultProps = {
  handleSubmit: undefined,
  pristine: false,
  invalid: false,
  submitting: false,
  onClick: undefined,
  className: undefined,
  loadingMessage: 'Saving...',
  type: 'submit',
  secondary: false,
}

export default SubmitButton
