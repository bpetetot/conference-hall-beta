import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import Field from 'components/form/field'

import {
  input, address, markdownInput, SubmitButton,
} from 'components/form'
import { required } from 'components/form/validators'
import Avatar from 'components/avatar'

import './profile.css'

const Profile = ({
  displayName, photoURL, email, onSubmit, initialValues, submitting,
}) => (
  <div className="profile">
    <div className="profile-header card">
      <Avatar name={displayName} src={photoURL} className="profile-avatar" square />
      <div>
        <h1>{displayName}</h1>
        <small>{email}</small>
      </div>
    </div>

    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, invalid }) => (
        <form className="profile-form card">
          <Field
            name="displayName"
            label="Full name"
            type="text"
            component={input}
            validate={required}
            inline
          />
          <Field name="company" label="Company" type="text" component={input} inline />
          <Field name="phone" label="Phone" type="text" component={input} inline />
          <Field name="language" label="Spoken language" type="text" component={input} inline />
          <Field
            name="twitter"
            label="Twitter"
            type="text"
            component={input}
            placeholder="@username"
            inline
          />
          <Field
            name="github"
            label="Github"
            type="text"
            component={input}
            placeholder="username"
            inline
          />
          <Field name="address" label="City" type="text" component={address} inline />
          <Field name="bio" label="Biography" component={markdownInput} inline />
          <Field
            name="speakerReferences"
            label="Speaker references"
            tooltip="Give some information about your speaker experience: your already-given talks, conferences or meetups as speaker, video links..."
            component={markdownInput}
            inline
          />

          <SubmitButton
            handleSubmit={handleSubmit}
            pristine={pristine}
            submitting={submitting}
            invalid={invalid}
          >
            Save profile
          </SubmitButton>
        </form>
      )}
    </Form>
  </div>
)

Profile.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  photoURL: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

Profile.defaultProps = {
  displayName: undefined,
  email: undefined,
  photoURL: undefined,
  initialValues: {},
  submitting: false,
}

export default Profile
