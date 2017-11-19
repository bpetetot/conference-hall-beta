/* eslint-disable react/prop-types,react/no-array-index-key */
import React from 'react'
import { Field } from 'redux-form'
import uuid from 'uuid/v5'

import Modal from 'components/modal'
import Item from './item'
import './itemsWithModal.css'

export default (name, Form) =>
  class extends React.Component {
    onAddItem = (data) => {
      const { fields, closeModal } = this.props
      const id = uuid(data.name, uuid.URL)
      fields.push({ id, ...data })
      closeModal()
    }

    onUpdateItem = index => (data) => {
      const { fields, closeModal } = this.props
      const old = fields.get(index)
      fields.remove(index)
      fields.insert(index, { ...old, ...data })
      closeModal()
    }

    onRemoveItem = index => () => {
      this.props.fields.remove(index)
    }

    render() {
      const { fields, openModal } = this.props
      return (
        <div className="items-form">
          {fields.map((item, index) => (
            <div key={index}>
              <Field
                name={item}
                component={({ input }) => (
                  <Item
                    onEdit={openModal(`${name}-${index}`)}
                    onDelete={this.onRemoveItem(index)}
                    {...input.value}
                  />
                )}
              />
              <Modal id={`${name}-${index}`}>
                <Form edit initialValues={fields.get(index)} onSubmit={this.onUpdateItem(index)} />
              </Modal>
            </div>
          ))}
          <button className="btn btn-primary" type="button" onClick={openModal(`add-${name}`)}>
            <i className="fa fa-plus" />
          </button>
          <Modal id={`add-${name}`}>
            <Form onSubmit={this.onAddItem} />
          </Modal>
        </div>
      )
    }
  }
