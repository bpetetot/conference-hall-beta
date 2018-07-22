/* eslint-disable react/prop-types,react/no-array-index-key */
import React from 'react'
import { Field } from 'redux-form'
import uuid from 'uuid/v5'

import { Modal } from 'components/portals'
import Button from 'components/button'
import Item from './item'

import './itemsWithModal.css'

export default Form =>
  class extends React.Component {
    onAddItem = hide => (data) => {
      const id = uuid(data.name, uuid.URL)
      this.props.fields.push({ id, ...data })
      hide()
    }

    onUpdateItem = (index, hide) => (data) => {
      const { fields } = this.props
      const old = fields.get(index)
      fields.remove(index)
      fields.insert(index, { ...old, ...data })
      hide()
    }

    onRemoveItem = index => () => {
      this.props.fields.remove(index)
    }

    render() {
      const { fields } = this.props
      return (
        <div className="items-form">
          {fields.map((item, index) => (
            <div key={index}>
              <Field
                name={item}
                component={({ input }) => (
                  <Modal
                    renderTrigger={({ show }) => (
                      <Item onEdit={show} onDelete={this.onRemoveItem(index)} {...input.value} />
                    )}
                  >
                    {({ hide }) => (
                      <Form
                        edit
                        initialValues={fields.get(index)}
                        onSubmit={this.onUpdateItem(index, hide)}
                      />
                    )}
                  </Modal>
                )}
              />
            </div>
          ))}
          <Modal
            renderTrigger={({ show }) => (
              <Button onClick={show} type="button">
                <i className="fa fa-plus" />
              </Button>
            )}
          >
            {({ hide }) => <Form onSubmit={this.onAddItem(hide)} />}
          </Modal>
        </div>
      )
    }
  }
