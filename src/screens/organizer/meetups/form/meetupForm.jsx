import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'

import { ConfirmationPopin } from 'components/portals'
import Button from 'components/button'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import Field from 'components/form/field'
import { input, textarea, dayPicker, address, SubmitButton } from 'components/form'
import { required, url } from 'components/form/validators'
import { createMeetup, fetchMeetup, updateMeetup, deleteMeetup } from 'firebase/meetups'
import Titlebar from 'components/titlebar/titlebar'
import { LoadingIndicator } from 'components/loader'

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
    <>
      <Titlebar title={meetupId ? 'Edit meetup' : 'Create meetup'}>
        {meetupId && (
          <ConfirmationPopin
            title="Delete Meetup"
            content="Are you sure you want to delete this meetup?"
            withOk
            withCancel
            onOk={onDelete}
            renderTrigger={({ show }) => (
              <Button error secondary onClick={show}>
                Delete Meetup
              </Button>
            )}
          />
        )}
      </Titlebar>
      {meetupId && isEmpty(initialValues) ? (
        <LoadingIndicator />
      ) : (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit, pristine, submitting }) => (
            <form className="card">
              <Field
                name="name"
                label="Name"
                type="text"
                component={input}
                inline
                validate={required}
              />
              <Field
                name="description"
                label="Description"
                type="text"
                inline
                component={textarea}
              />
              <Field
                name="date"
                label="Date"
                component={dayPicker}
                inline
                showTimeSelect
                dateFormat="MMM do yyyy hh:mm aa"
              />
              <Field
                name="address"
                label="Venue address"
                type="text"
                component={address}
                validate={required}
                inline
              />
              <Field
                name="ticketingUrl"
                label="Ticketing URL"
                type="text"
                component={input}
                validate={url}
                inline
              />
              <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
                {!initialValues ? 'Create meetup' : 'Save meetup'}
              </SubmitButton>
            </form>
          )}
        </Form>
      )}
    </>
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
