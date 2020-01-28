import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import Button from 'components/button'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import Field from 'components/form/field'
import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'
import { createMeetup, fetchMeetup, updateMeetup, deleteMeetup } from 'firebase/meetups'

const MeetupForm = ({ eventId, meetupId, push }) => {
  const [initialValues, setInitialValues] = useState({})

  const onSubmit = async values => {
    if (meetupId) {
      await updateMeetup(eventId, meetupId, values)
    } else {
      await createMeetup(eventId, values)
    }
    push('organizer-event-meetups', { eventId })
  }

  const onDelete = async () => {
    await deleteMeetup(eventId, meetupId)
    push('organizer-event-meetups', { eventId })
  }

  useEffect(() => {
    if (!meetupId) return
    fetchMeetup(eventId, meetupId).then(doc => setInitialValues(doc.data()))
  }, [eventId, meetupId])

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine }) => (
        <form>
          <Field
            name="name"
            label="Name"
            type="text"
            component={input}
            inline
            validate={required}
          />
          <Field name="description" label="Description" type="text" inline component={textarea} />
          {meetupId && (
            <Button error secondary onClick={onDelete}>
              Delete Meetup
            </Button>
          )}
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine}>
            {!initialValues ? 'Create meetup' : 'Save meetup'}
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

MeetupForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  meetupId: PropTypes.string,
  push: PropTypes.func.isRequired,
}

MeetupForm.defaultProps = {
  meetupId: undefined,
}

export default compose(
  forRoute.absolute(['organizer-meetups-create', 'organizer-meetups-edit']),
  inject((store, props, { router }) => ({
    eventId: router.getParam('eventId'),
    meetupId: router.getParam('meetupId'),
    push: router.push,
  })),
)(MeetupForm)
