import React from 'react'
import PropTypes from 'prop-types'
import Badge from 'components/badge'
import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from '../../../firebase/constants'

import styles from './talkSelection.module.css'

function TalkSelection({ eventId, onChange, state, emailStatus, isDeliberationDone }) {
  return (
    <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
      <div className={styles.wrapper}>
        {isDeliberationDone && (
          <div>
            {state === 'accepted' && (
              <Badge success outline>
                Accepted proposal
              </Badge>
            )}
            {state === 'rejected' && (
              <Badge error outline>
                Rejected proposal
              </Badge>
            )}
            {state === 'confirmed' && <Badge success>Confirmed by speaker</Badge>}
            {state === 'declined' && <Badge error>Declined by speaker</Badge>}
          </div>
        )}

        {!isDeliberationDone && (
          <select
            className={styles.selector}
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
            defaultValue={state}
            aria-label="Set proposal deliberation"
          >
            <option key="submitted" value="submitted">
              Deliberate...
            </option>
            <option key="accepted" value="accepted">
              Accepted proposal
            </option>
            <option key="rejected" value="rejected">
              Rejected proposal
            </option>
          </select>
        )}

        {emailStatus && emailStatus !== 'none' && (
          <div className={styles.email}>
            {emailStatus === 'sending' && (
              <Badge light outline>
                Sending email...
              </Badge>
            )}
            {emailStatus === 'sent' && (
              <Badge info outline>
                Email sent
              </Badge>
            )}
            {emailStatus === 'delivered' && (
              <Badge success outline>
                Email delivered
              </Badge>
            )}
          </div>
        )}
      </div>
    </HasRole>
  )
}

TalkSelection.propTypes = {
  eventId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.string,
  emailStatus: PropTypes.string,
  isDeliberationDone: PropTypes.bool.isRequired,
}

TalkSelection.defaultProps = {
  state: undefined,
  emailStatus: 'none',
}

export default TalkSelection
