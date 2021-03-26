import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import { useUpdateEventField } from 'data/event'

import styles from './deliberation.module.css'
import EmailsForm from '../emails'

const DeliberationForm = ({ event }) => {
  const { mutate: onDeliberation } = useUpdateEventField(event.id, 'deliberationEnabled')
  const { mutate: onProposalsRatings } = useUpdateEventField(event.id, 'displayProposalsRatings')
  const { mutate: onOrganizersRatings } = useUpdateEventField(event.id, 'displayOrganizersRatings')
  const { mutate: onProposalsSpeakers } = useUpdateEventField(event.id, 'displayProposalsSpeakers')

  return (
    <>
      <div className={cn(styles.form, 'card')}>
        <Label
          name="enabled"
          label="Enable Deliberation"
          description="Active deliberation to mark proposals to accepted or rejected, and send confirmation emails to speakers."
          classNameInput={styles.label}
          right
        >
          <Toggle name="enabled" checked={event.deliberationEnabled} onChange={onDeliberation} />
        </Label>

        <Label
          name="displayOrganizersRatings"
          label="Display organizers ratings"
          description="All organizers can see ratings of others."
          classNameInput={styles.label}
          right
        >
          <Toggle
            name="displayOrganizersRatings"
            checked={event.displayOrganizersRatings}
            onChange={onOrganizersRatings}
          />
        </Label>

        <Label
          name="displayProposalsRatings"
          label="Display ratings in proposals list"
          classNameInput={styles.label}
          right
        >
          <Toggle
            name="displayProposalsRatings"
            checked={event.displayProposalsRatings}
            onChange={onProposalsRatings}
          />
        </Label>

        <Label
          name="displayProposalsSpeakers"
          label="Display speakers info in proposal page"
          classNameInput={styles.label}
          right
        >
          <Toggle
            name="displayProposalsSpeakers"
            checked={event.displayProposalsSpeakers}
            onChange={onProposalsSpeakers}
          />
        </Label>
      </div>
      <EmailsForm event={event} />
    </>
  )
}

DeliberationForm.propTypes = {
  event: PropTypes.object.isRequired,
}

export default DeliberationForm
