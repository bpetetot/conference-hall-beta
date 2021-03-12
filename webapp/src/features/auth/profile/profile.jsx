import React from 'react'
import { Form } from 'react-final-form'

import { useAuth } from 'features/auth'
import Button from 'components/button'
import Field from 'components/form/field'
import { input, address, markdownInput, SubmitButton } from 'components/form'
import * as validators from 'components/form/validators'
import Avatar from 'components/avatar'
import { useResetUserProvider, useUpdateUser } from 'data/user'

import './profile.css'

const validateEmail = validators.validate([validators.required, validators.email])

const Profile = () => {
  const { user } = useAuth()
  const { mutateAsync: resetUserProvider } = useResetUserProvider()
  const { mutateAsync: updateUser } = useUpdateUser()
  const { name, photoURL, email } = user

  const initialValues = {
    email: user.email,
    name: user.name,
    company: user.company,
    photoURL: user.photoURL,
    phone: user.phone,
    language: user.language,
    twitter: user.twitter,
    github: user.github,
    bio: user.bio,
    references: user.references,
    address: {
      address: user.address,
      lat: user.lat,
      lng: user.lng,
      timezone: user.timezone,
    },
  }

  const onSubmit = (data) =>
    updateUser({
      ...data,
      address: data?.address?.address,
      lat: data?.address?.lat,
      lng: data?.address?.lng,
      timezone: data?.address?.timezone,
    })

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, invalid, submitting }) => (
        <div className="profile">
          <div className="profile-header card">
            <Avatar name={name} src={photoURL} className="profile-avatar" square />
            <div className="profile-infos">
              <h1>{name}</h1>
              <small>{email}</small>
            </div>
            <div className="profile-button">
              <Button secondary disabled={submitting} onClick={resetUserProvider}>
                Set defaults from auth provider
              </Button>
            </div>
          </div>
          <form className="profile-form card">
            <Field
              name="name"
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
              validate={validators.url}
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
              name="references"
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

export default Profile
