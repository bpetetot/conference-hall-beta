import React from 'react'

import useRedirectNext from 'features/router/useRedirectNext'
import InputButton from 'components/form/inputButton'

import styles from './Beta.module.css'
import { useValidateBetaKey } from '../../data/betaKey'

const BetaAccess = () => {
  const redirectNext = useRedirectNext()
  const { mutate: validateBetaKey, isError } = useValidateBetaKey()
  const onValidateBetaKey = (betaAccess) => {
    validateBetaKey(betaAccess, { onSuccess: redirectNext })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Beta Access key needed</h1>
      <p>The organizer hall is in closed-beta access, you need a key to access it.</p>
      <div className={styles.form}>
        <InputButton
          btnLabel="Access beta"
          type="text"
          placeholder="Please type your beta access key here"
          onClick={onValidateBetaKey}
        />
      </div>
      <div className={styles.request}>
        <a href="https://forms.gle/AnArRCSHibmG59zw7" target="NEW">
          Request a beta key
        </a>
      </div>
      {isError && <div className={styles.error}>Sorry, invalid beta access key.</div>}
    </div>
  )
}

export default BetaAccess
