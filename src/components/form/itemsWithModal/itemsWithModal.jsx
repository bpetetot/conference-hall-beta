/* eslint-disable react/prop-types,react/no-array-index-key,react/no-unstable-nested-components,class-methods-use-this */
import React from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { v5 as uuid } from 'uuid'
import isEqual from 'lodash/isEqual'

import { Modal } from 'components/portals'
import Button from 'components/button'
import Item from './item'

import './itemsWithModal.css'

export default (name, Form) =>
  class extends React.Component {
    onAddItem = (fields, hide) => (data) => {
      const id = uuid(data.name, uuid.URL)
      fields.push({ id, ...data })
      hide()
    }

    onUpdateItem = (fields, index, hide) => (data) => {
      const old = fields.value[index]
      fields.update(index, { ...old, ...data })
      hide()
    }

    onRemoveItem = (fields, index) => () => {
      fields.remove(index)
    }

    render() {
      return (
        <FieldArray name={name} isEqual={isEqual}>
          {({ fields }) => (
            <div className="items-form">
              <Modal
                renderTrigger={({ show }) => (
                  <Button onClick={show} aria-label={`Add ${name}`}>
                    <i className="fa fa-plus" />
                  </Button>
                )}
              >
                {({ hide }) => <Form onSubmit={this.onAddItem(fields, hide)} />}
              </Modal>
              {fields.map((item, index) => (
                <div key={index}>
                  <Field
                    name={item}
                    component={({ input }) => (
                      <Modal
                        renderTrigger={({ show }) => {
                          return (
                            input.value && (
                              <Item
                                onEdit={show}
                                onDelete={this.onRemoveItem(fields, index)}
                                {...input.value}
                              />
                            )
                          )
                        }}
                      >
                        {({ hide }) => (
                          <Form
                            edit
                            initialValues={fields.value[index]}
                            onSubmit={this.onUpdateItem(fields, index, hide)}
                          />
                        )}
                      </Modal>
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </FieldArray>
      )
    }
  }
