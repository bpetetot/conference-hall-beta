import React, { useCallback, useState } from 'react'

import useRedirectNext from 'features/router/useRedirectNext'
import InputButton from 'components/form/inputButton'

import styles from './Beta.module.css'
import { useValidateBetaKey } from '../../data/betaKey'

const BetaAccess = () => {
  const [error, setError] = useState()
  const redirectNext = useRedirectNext()
  const { mutateAsync: validateBetaKey } = useValidateBetaKey()
  const onValidateBetaKey = useCallback(
    async (betaAccess) => {
      await validateBetaKey(betaAccess, {
        onSuccess: (isValid) => {
          if (isValid) {
            redirectNext()
          } else {
            setError('Sorry, invalid beta access key.')
          }
        },
      })
    },
    [redirectNext, validateBetaKey],
  )

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
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default BetaAccess
