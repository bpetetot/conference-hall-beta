import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Field, reduxForm } from 'redux-form'

import IconLabel from 'components/iconLabel'
import { radio, SubmitButton, RadioGroup } from 'components/form'
import './votes.css'

const Votes = ({ className, ...formProps }) => (
  <form className={cn(className, 'card')}>
    <div className="proposals-votes-buttons">
      <div className="proposals-votes-title">Vote</div>
      <div className="proposals-votes-stars">
        <i className="fa fa-star-o fa-2x" />
        <i className="fa fa-star-o fa-2x" />
        <i className="fa fa-star-o fa-2x" />
        <i className="fa fa-star-o fa-2x" />
        <i className="fa fa-star-o fa-2x" />
      </div>
      <RadioGroup name="type" inline noError>
        <Field
          name="type"
          value="rejected"
          label={<IconLabel icon="fa fa-times-circle" label="No way !" />}
          type="radio"
          component={radio}
        />
        <Field
          name="type"
          value="na"
          label={<IconLabel icon="fa fa-ban" label="No opinion" />}
          type="radio"
          component={radio}
        />
        <Field
          name="type"
          value="loved"
          label={<IconLabel icon="fa fa-heart" label="I love it !" />}
          type="radio"
          component={radio}
        />
      </RadioGroup>
    </div>
    <div>
      <SubmitButton {...formProps}>Validate and Next</SubmitButton>
    </div>
  </form>
)

Votes.propTypes = {
  className: PropTypes.string,
}

Votes.defaultProps = {
  className: undefined,
}

export default reduxForm({ form: 'proposal-vote' })(Votes)
