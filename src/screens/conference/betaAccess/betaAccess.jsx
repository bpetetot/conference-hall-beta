import React, { useCallback, useState } from 'react'
import { func } from 'prop-types'

import { isValidBetaAccessKey } from 'firebase/betaAccess'
import { useAuth } from 'features/auth'
import InputButton from 'components/form/inputButton'

import styles from './betaAccess.module.css'

const BetaAccess = ({ redirectToNextUrl }) => {
  const { updateUser } = useAuth()
  const [error, setError] = useState()

  const onValidateBetaKey = useCallback(
    async (betaAccess) => {
      const valid = await isValidBetaAccessKey(betaAccess)
      if (valid) {
        await updateUser({ betaAccess })
        redirectToNextUrl(betaAccess)
      } else {
        setError('Sorry, invalid beta access key.')
      }
    },
    [redirectToNextUrl, updateUser],
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

BetaAccess.propTypes = {
  redirectToNextUrl: func.isRequired,
}

export default BetaAccess
