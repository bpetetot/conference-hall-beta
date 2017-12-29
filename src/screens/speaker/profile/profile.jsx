import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm } from 'redux-form'
import { input, address, textarea, SubmitButton } from 'components/form'

import './profile.css'

const Profile = ({
  displayName, photoURL, email, ...formProps
}) => (
  <div className="profile">
    <div className="profile-header card">
      <img src={photoURL} alt="profile avatar" />
      <div>
        <h1>{displayName}</h1>
        <small>{email}</small>
      </div>
    </div>
    <form className="profile-form card">
      <Field name="company" label="Company" type="text" component={input} />
      <Field name="phone" label="Phone" type="text" component={input} />
      <Field name="language" label="Favorite language" type="text" component={input} />
      <Field name="city" label="City" type="text" component={address} />
      <Field name="bio" label="Biography" component={textarea} />
      <SubmitButton {...formProps}>Save profile</SubmitButton>
    </form>
  </div>
)

Profile.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  photoURL: PropTypes.string,
}

Profile.defaultProps = {
  displayName: 'noname',
  email: undefined,
  photoURL: undefined, // TODO add a default avatar (if not given)
}

export default reduxForm()(Profile)
