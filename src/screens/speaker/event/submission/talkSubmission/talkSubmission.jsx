import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import Button from 'components/button'
import { Field, reduxForm } from 'redux-form'
import {
  markdownInput, radio, SubmitButton, RadioGroup,
} from 'components/form'
import isEmpty from 'lodash/isEmpty'

import './talkSubmission.css'

const TalkSubmission = ({
  talk, event, update, unsubmitTalk, ...formProps
}) => (
  <form className="talk-submission">
    <Titlebar icon="fa fa-microphone" title={talk.title}>
      {update && (
        <Button secondary onClick={() => unsubmitTalk(talk.id, event.id)}>
          Remove submission
        </Button>
      )}
      <SubmitButton {...formProps} noPristine>
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
