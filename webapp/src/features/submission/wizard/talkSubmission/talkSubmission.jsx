import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'

import { useSubmitTalk, useUnsubmitTalk } from 'data/talk'
import Field from 'components/form/field'
import Titlebar from 'components/titlebar'
import { markdownInput, radio, SubmitButton, RadioGroup } from 'components/form'
import Alert from 'components/alert'
import { required } from 'components/form/validators'

import './talkSubmission.css'
import { useWizard } from '../context'

const TalkSubmission = ({ event, talk }) => {
  const { mutate: submitTalk, error, isError, isLoading: isSaving } = useSubmitTalk(
    event.id,
    talk.id,
  )
  const { mutate: unsubmitTalk, isLoading: isRemoving } = useUnsubmitTalk(event.id, talk.id)
  const { nextStep, resetWizard } = useWizard()

  const proposal = talk.proposals.find((p) => p.eventId === parseInt(event.id, 10))
  const isUpdate = !!proposal
  const initialValues = {
    comments: proposal?.comments,
    formats: String(proposal?.formats?.[0]?.id),
    categories: String(proposal?.categories?.[0]?.id),
  }

  const onSubmit = async (data) => submitTalk(data, { onSuccess: nextStep })
  const onUnsubmit = () => unsubmitTalk(null, { onSuccess: resetWizard })

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, invalid, errors }) => (
        <form className="talk-submission">
          <Titlebar icon="fa fa-microphone" title={talk.title}>
            {isUpdate && (
              <SubmitButton secondary type="button" onClick={onUnsubmit} submitting={isRemoving}>
                Remove submission
              </SubmitButton>
            )}
          </Titlebar>
          {isError && (
            <div className="form-error">
              <Alert title={error.message} type="error" />
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
                    value={String(c.id)}
                    label={c.name}
                    type="radio"
                    component={radio}
                    validate={event.categoriesRequired ? required : undefined}
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
                    value={String(f.id)}
                    label={f.name}
                    type="radio"
                    component={radio}
                    validate={event.formatsRequired ? required : undefined}
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
            <SubmitButton onClick={handleSubmit} submitting={isSaving} invalid={invalid}>
              {isUpdate ? 'Update submission' : `Submit to ${event.name}`}
            </SubmitButton>
          </div>
        </form>
      )}
    </Form>
  )
}

TalkSubmission.propTypes = {
  event: PropTypes.object.isRequired,
  talk: PropTypes.object.isRequired,
}

export default TalkSubmission
