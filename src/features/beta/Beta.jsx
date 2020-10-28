import React, { useCallback, useState } from 'react'

import { isValidBetaAccessKey } from 'firebase/betaAccess'
import { useAuth } from 'features/auth'
import useRedirectNext from 'features/router/useRedirectNext'
import InputButton from 'components/form/inputButton'

import styles from './Beta.module.css'

const BetaAccess = () => {
  const { updateUser } = useAuth()
  const [error, setError] = useState()
  const redirectNext = useRedirectNext()

  const onValidateBetaKey = useCallback(
    async (betaAccess) => {
      const valid = await isValidBetaAccessKey(betaAccess)
      if (valid) {
        await updateUser({ betaAccess })
        redirectNext()
      } else {
        setError('Sorry, invalid beta access key.')
      }
    },
    [redirectNext, updateUser],
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
