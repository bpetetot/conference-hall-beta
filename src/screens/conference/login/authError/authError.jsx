import React from 'react'
import PropTypes from 'prop-types'

import { DumbModal } from 'components/modal'

import './authError.css'

const AuthErrorModal = ({ error, clearAuthError }) => (
  <DumbModal opened={!!error.message} onClose={clearAuthError} className="auth-error">
    <div>{error.code}</div>
    <div>{error.message}</div>
  </DumbModal>
)

AuthErrorModal.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string,
  }),
  clearAuthError: PropTypes.func.isRequired,
}

AuthErrorModal.defaultProps = {
  error: {},
}

export default AuthErrorModal
