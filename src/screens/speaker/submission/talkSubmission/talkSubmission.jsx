import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { Field, reduxForm } from 'redux-form'
import { textarea, radio, SubmitButton, RadioGroup } from 'components/form'
import isEmpty from 'lodash/isEmpty'

import './talkSubmission.css'

const TalkSubmission = ({ talk, event, ...formProps }) => (
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
)

TalkSubmission.propTypes = {
  talk: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  event: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

TalkSubmission.defaultProps = {
  talk: {},
  event: {},
}

export default reduxForm({ form: 'submit-talk' })(TalkSubmission)
