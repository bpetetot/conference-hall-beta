import React from 'react'
import PropTypes from 'prop-types'
import { propTypes } from 'redux-form'

import Button from 'components/button'
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
  <Button
    accent
    type="submit"
    className={className}
    onClick={handleSubmit}
    disabled={(!noPristine && pristine) || submitting || invalid}
  >
    {submitting && <IconLabel icon="fa fa-cog fa-spin fa-fw" label={loadingMessage} />}
    {!submitting && children}
  </Button>
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
