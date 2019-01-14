import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import Field from 'components/form/field'
import Titlebar from 'components/titlebar'
import {
  markdownInput, radio, SubmitButton, RadioGroup,
} from 'components/form'
import isEmpty from 'lodash/isEmpty'

import './talkSubmission.css'

const TalkSubmission = ({
  talk,
  event,
  update,
  onSubmit,
  unsubmitTalk,
  initialValues,
  isSubmitting,
  isUnsubmitting,
}) => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    {({ handleSubmit }) => (
      <form className="talk-submission">
        <Titlebar icon="fa fa-microphone" title={talk.title}>
          {update && (
            <SubmitButton
              secondary
              type="button"
              onClick={unsubmitTalk}
              submitting={isUnsubmitting}
            >
              Remove submission
            </SubmitButton>
          )}
          <SubmitButton onClick={handleSubmit} submitting={isSubmitting}>
            {update ? 'Update submission' : `Submit to ${event.name}`}
          </SubmitButton>
        </Titlebar>
        <div className="submit-talk-form card">
          {!isEmpty(event.categories) && (
            <RadioGroup name="categories" label="Talk categories" inline>
              {event.categories.map(c => (
                <Field
                  key={c.id}
                  name="categories"
                  value={c.id}
                  label={c.name}
                  type="radio"
                  component={radio}
                />
              ))}
            </RadioGroup>
          )}
          {!isEmpty(event.formats) && (
            <RadioGroup name="formats" label="Talk formats" inline>
              {event.formats.map(f => (
                <Field
                  key={f.id}
                  name="formats"
                  value={f.id}
                  label={f.name}
                  type="radio"
                  component={radio}
                />
              ))}
            </RadioGroup>
          )}
          <Field name="comments" label="Message to organizers" component={markdownInput} />
        </div>
      </form>
    )}
  </Form>
)

TalkSubmission.propTypes = {
  update: PropTypes.bool,
  talk: PropTypes.objectOf(PropTypes.any),
  event: PropTypes.objectOf(PropTypes.any),
  onSubmit: PropTypes.func.isRequired,
  unsubmitTalk: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isUnsubmitting: PropTypes.bool,
}

TalkSubmission.defaultProps = {
  update: false,
  talk: {},
  event: {},
  initialValues: undefined,
  isSubmitting: false,
  isUnsubmitting: false,
}

export default TalkSubmission
