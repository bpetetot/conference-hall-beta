import React from 'react'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import { Stepper1 } from 'components/stepper'
import { Field, reduxForm } from 'redux-form'
import { textarea, radio, SubmitButton, RadioGroup } from 'components/form'
import isEmpty from 'lodash/isEmpty'

import './talkSubmission.css'

const TalkSubmission = ({ talk, event, ...formProps }) => (
  <div className="submit-talk">
    <Titlebar
      icon="fa fa-paper-plane"
      title={
        <span>
          Submit to <span className="event-subtitle">{event.name}</span>
        </span>
      }
    />
    <Stepper1 />
    <div className="card submit-talk-content">
      <h2>
        <IconLabel icon="fa fa-microphone" label={talk.title} />
      </h2>
      <form className="submit-talk-form">
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
        <Field name="comments" label="Message to organizers" component={textarea} />
        <SubmitButton {...formProps} noPristine>
          Submit to {event.name}
        </SubmitButton>
      </form>
    </div>
  </div>
)

export default reduxForm({ form: 'submit-talk' })(TalkSubmission)
