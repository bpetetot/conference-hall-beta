/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import uuid from 'uuid/v5'

import Format from './format'
import FormatFormModal from './formatForm'

import './formatsForm.css'

class FormatsForm extends React.Component {
  onAddFormat = (data) => {
    const { fields, closeModal } = this.props
    const id = uuid(data.name, uuid.URL)
    fields.push({ id, ...data })
    closeModal()
  }

  onUpdateFormat = index => (data) => {
    const { fields, closeModal } = this.props
    const old = fields.get(index)
    fields.remove(index)
    fields.insert(index, { ...old, ...data })
    closeModal()
  }

  onRemoveFormat = index => () => {
    this.props.fields.remove(index)
  }

  render() {
    const { fields, openModal } = this.props
    return (
      <div className="formats-form">
        {fields.map((format, index) => (
          <div key={index}>
            <Field
              name={format}
              component={({ input }) => (
                <Format
                  onEdit={openModal(`format-${index}`)}
                  onDelete={this.onRemoveFormat(index)}
                  {...input.value}
                />
              )}
            />
            <FormatFormModal
              modalId={`format-${index}`}
              initialValues={fields.get(index)}
              edit
              onSubmit={this.onUpdateFormat(index)}
            />
          </div>
        ))}
        <button className="btn btn-primary" type="button" onClick={openModal('create-format')}>
          <i className="fa fa-plus" />
        </button>
        <FormatFormModal modalId="create-format" onSubmit={this.onAddFormat} />
      </div>
    )
  }
}

FormatsForm.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default FormatsForm
