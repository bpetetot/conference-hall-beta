import React from 'react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import { Form } from 'react-final-form'
import Field from 'components/form/field'
import Button from 'components/button'

import { input, address, markdownInput, SubmitButton } from 'components/form'
import * as validators from 'components/form/validators'
import Avatar from 'components/avatar'

import './profile.css'
import { useAuth } from 'features/auth'

const validateEmail = validators.validate([validators.required, validators.email])
const validatePhoto = validators.validate([validators.required, validators.url])

const Profile = () => {
  const { user, updateUser, resetUserFromProvider } = useAuth()
  const { displayName, photoURL, email } = user

  return (
    <Form onSubmit={updateUser} initialValues={user}>
      {({ handleSubmit, pristine, invalid, submitting }) => (
        <div className="profile">
          <div className="profile-header card">
            <Avatar name={displayName} src={photoURL} className="profile-avatar" square />
            <div className="profile-infos">
              <h1>{displayName}</h1>
              <small>{email}</small>
            </div>
            <div className="profile-button">
              <Button
                secondary
                loading={submitting}
                disabled={submitting}
                onClick={resetUserFromProvider}
              >
                Set defaults from auth provider
              </Button>
            </div>
          </div>
          <form className="profile-form card">
            <Field
              name="displayName"
              label="Full name"
              type="text"
              component={input}
              validate={validators.required}
              inline
            />
            <Field
              name="email"
              label="Email"
              type="text"
              component={input}
              validate={validateEmail}
              inline
            />
            <Field
              name="photoURL"
              label="Photo URL"
              type="text"
              component={input}
              validate={validatePhoto}
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
              placeholder="username"
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
        </div>
      )}
    </Form>
  )
}

export default forRoute(['speaker-profile', 'organizer-profile'])(Profile)
