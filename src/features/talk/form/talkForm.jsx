import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'
import languages from 'helpers/language.json'

import { LoadingIndicator } from 'components/loader'
import Field from 'components/form/field'
import { input, markdownInput, radio, SubmitButton, RadioGroup, select } from 'components/form'
import { required } from 'components/form/validators'
import './talkForm.css'
import { useSaveTalk, useTalk } from '../useTalks'

const TalkForm = () => {
  const { data, isLoading } = useTalk()

  const [saveTalk] = useSaveTalk(data?.id)

  const navigate = useNavigate()
  const handleFormSubmit = useCallback(
    async (formData) => {
      const result = await saveTalk(formData)
      navigate(`/speaker/talk/${formData.id || result.id}`)
    },
    [navigate, saveTalk],
  )

  if (isLoading) return <LoadingIndicator />

  return (
    <Form onSubmit={handleFormSubmit} initialValues={data}>
      {({ handleSubmit, pristine, invalid, submitting }) => (
        <form className="talk-form card">
          <Field
            name="title"
            label="Title"
            type="text"
            component={input}
            validate={required}
            inline
          />
          <Field
            name="abstract"
            label="Abstract"
            component={markdownInput}
            validate={required}
            inline
          />
          <Field name="language" label="Talk language" type="text" component={select} inline>
            <option />
            {Object.entries(languages).map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </Field>

          <RadioGroup name="level" label="Level" inline>
            <Field name="level" value="beginner" label="Beginner" type="radio" component={radio} />
            <Field
              name="level"
              value="intermediate"
              label="Intermediate"
              type="radio"
              component={radio}
            />
            <Field name="level" value="advanced" label="Advanced" type="radio" component={radio} />
          </RadioGroup>
          <Field
            name="references"
            label="Talk References"
            tooltip="Give more info about your talk: slides, workshop pre-requities, github repo, video, summary, steps of the talk, which conference or meetup where it has been already given?"
            component={markdownInput}
            inline
          />
          <SubmitButton
            handleSubmit={handleSubmit}
            pristine={pristine}
            invalid={invalid}
            submitting={submitting}
          >
            {!data ? 'Create Talk' : 'Save Talk'}
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

export default TalkForm
