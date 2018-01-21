import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { Field, reduxForm } from 'redux-form'
import { textarea, radio, SubmitButton, RadioGroup } from 'components/form'
import isEmpty from 'lodash/isEmpty'

import './talkSubmission.css'

const TalkSubmission = ({
  talk, event, update, unsubmitTalk, ...formProps
}) => (
  <form className="submit-talk-form card">
    <h2>
      <IconLabel icon="fa fa-microphone" label={talk.title} />
    </h2>
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
    <div className="submit-talk-buttons">
      {update && (
        <button onClick={() => unsubmitTalk(talk.id, event.id)} className="btn">
          Remove submission
        </button>
      )}
      <SubmitButton {...formProps} noPristine>
        {update ? 'Update submission' : `Submit to ${event.name}`}
      </SubmitButton>
    </div>
  </form>
)

TalkSubmission.propTypes = {
  update: PropTypes.bool,
  talk: PropTypes.objectOf(PropTypes.any),
  event: PropTypes.objectOf(PropTypes.any),
  unsubmitTalk: PropTypes.func.isRequired,
}

TalkSubmission.defaultProps = {
  update: false,
  talk: {},
  event: {},
}

export default reduxForm({ form: 'submit-talk' })(TalkSubmission)
