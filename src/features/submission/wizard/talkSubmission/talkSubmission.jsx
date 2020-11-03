import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import Field from 'components/form/field'
import Titlebar from 'components/titlebar'
import { markdownInput, radio, SubmitButton, RadioGroup } from 'components/form'
import Alert from 'components/alert'
import { required } from 'components/form/validators'
import { LoadingIndicator } from 'components/loader'
import { useCurrentEvent } from 'features/event/currentEventContext'

import './talkSubmission.css'
import { useTalk, useSubmitTalk, useUnsubmitTalk } from 'features/talk/useTalks'

const TalkSubmission = ({ talkId, onSubmit, onUnsubmit }) => {
  const { data: event } = useCurrentEvent()
  const { data: talk, isLoading } = useTalk(talkId)

  const [submitTalk, { isLoading: isSubmitting, error: submitError }] = useSubmitTalk(
    talkId,
    event.id,
    onSubmit,
  )

  const [unsubmitTalk, { isLoading: isUnsubmitting, error: unsubmitError }] = useUnsubmitTalk(
    talkId,
    event.id,
    onUnsubmit,
  )

  if (isLoading) return <LoadingIndicator />

  const alreadySubmitted = talk.isSubmitted(event.id)
  const { formats, categories } = talk.getSubmission(event.id) || {}

  return (
    <Form onSubmit={submitTalk} initialValues={{ formats, categories }}>
      {({ handleSubmit, invalid, errors }) => (
        <form className="talk-submission">
          <Titlebar icon="fa fa-microphone" title={talk.title}>
            {alreadySubmitted && (
              <SubmitButton
                secondary
                type="button"
                onClick={unsubmitTalk}
                submitting={isUnsubmitting}
              >
                Remove submission
              </SubmitButton>
            )}
            <SubmitButton onClick={handleSubmit} submitting={isSubmitting} invalid={invalid}>
              {alreadySubmitted ? 'Update submission' : `Submit to ${event.name}`}
            </SubmitButton>
          </Titlebar>
          {!isEmpty(submitError || unsubmitError) && (
            <div className="form-error">
              <Alert title={submitError?.message || unsubmitError?.message} type="error" />
            </div>
          )}
          <div className="submit-talk-form card">
            {!isEmpty(event.categories) && (
              <RadioGroup
                name="categories"
                label="Talk categories"
                error={errors.categories}
                inline
              >
                {event.categories.map((c) => (
                  <Field
                    key={c.id}
                    name="categories"
                    value={c.id}
                    label={c.name}
                    type="radio"
                    component={radio}
                    validate={get(event, 'mandatoryFields.categories') ? required : undefined}
                  />
                ))}
              </RadioGroup>
            )}
            {!isEmpty(event.formats) && (
              <RadioGroup name="formats" label="Talk formats" error={errors.formats} inline>
                {event.formats.map((f) => (
                  <Field
                    key={f.id}
                    name="formats"
                    value={f.id}
                    label={f.name}
                    type="radio"
                    component={radio}
                    validate={get(event, 'mandatoryFields.formats') ? required : undefined}
                  />
                ))}
              </RadioGroup>
            )}
            <Field
              name="comments"
              label="Message to organizers"
              hints="Ask special requirements to organizers or just thank them."
              component={markdownInput}
            />
          </div>
        </form>
      )}
    </Form>
  )
}

TalkSubmission.propTypes = {
  talkId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUnsubmit: PropTypes.func.isRequired,
}

export default TalkSubmission
