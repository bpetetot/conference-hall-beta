import React from 'react'

import { Modal } from 'components/portals'
import Button from 'components/button'

import SignUp from './signup.container'

const SignupModal = () => (
  <Modal
    className="signup-modal"
    backdropClassName="signup-backdrop"
    renderTrigger={({ show }) => (
      <Button tertiary onClick={show}>
          SIGN UP
      </Button>
    )}
  >
    {() => <SignUp />}
  </Modal>
)

export default SignupModal
