import React from 'react'
import PropTypes from 'prop-types'

import { DumbModal } from 'components/modal'

const AuthErrorModal = ({ error, clearAuthError }) => (
  <DumbModal open={!!error.message} onClose={clearAuthError} className="auth-error">
    <h2>Sorry, an error occured during login</h2>
    {error.code === 'auth/web-storage-unsupported' ? (
      <div>
        <p>
          Conference Hall app needs cookies to be enabled in order to works with the Firebase Auth
          system. But your browser blocks 3rd party cookies. You can enable cookies using one of
          this process following your browser.
        </p>
        <div>
          <p>
            <strong>Google Chrome</strong>
            <ol>
              <li>At the top right, click the More button, then Settings.</li>
              <li>At the bottom, click Advanced.</li>
              <li>Under &apos;Privacy and security&apos;, click Content settings.</li>
              <li>Click Cookies.</li>
              <li>Turn off Block third-party cookies.</li>
            </ol>
          </p>
          <p>
            <strong>Apple Safari</strong>
            <ol>
              <li>Go to Safari › Preferences.</li>
              <li>Click Privacy.</li>
              <li>For Cookies and website data, select Always allow.</li>
            </ol>
          </p>
          <p>
            <strong>Mozilla Firefox</strong>
            <ol>
              <li>At the top right, click the Menu button, then Options.</li>
              <li>Click Privacy &amp; Security.</li>
              <li>
                Under History, set the drop-down menu next to Firefox will to Remember History.
              </li>
            </ol>
          </p>
          <p>
            <strong>Microsoft Edge</strong>
            <ol>
              <li>At the top right, click the Menu button, then Settings.</li>
              <li>Click View Advanced Settings.</li>
              <li>Set Cookies to Don&apos;t block cookies.</li>
            </ol>
          </p>
        </div>
      </div>
    ) : (
      <div>{error.message}</div>
    )}
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
