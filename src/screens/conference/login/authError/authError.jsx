import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/portals'

const AuthErrorModal = ({ error, clearAuthError }) => (
  <Modal defaultOpen={!!error.message} onClose={clearAuthError} className="auth-error">
    {() => (
      <Fragment>
        <h2>Sorry, an error occured during login</h2>
        <div>{error.message}</div>
      </Fragment>
    )}
  </Modal>
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
