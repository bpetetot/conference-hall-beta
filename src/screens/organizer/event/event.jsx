import React from 'react'

import { InputLabel, TextareaLabel } from '../../../components/form'
import './event.css'

const Event = () => (
  <div className="event">
    <InputLabel name="name" label="Name" type="text" />
    <TextareaLabel name="description" label="description" />
    <InputLabel name="address" label="Venue address" type="text" />
    <InputLabel name="city" label="City" type="text" />
    <InputLabel name="country" label="Country" type="text" />
    <InputLabel name="website" label="Website" type="text" />
    <InputLabel name="tags" label="Tags" type="text" />
    <button className="btn btn-primary">Create event</button>
  </div>
)

export default Event
