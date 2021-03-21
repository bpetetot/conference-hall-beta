import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import isEqual from 'lodash/isEqual'

import { Modal } from 'components/portals'
import Button from 'components/button'
import Item from './item'

import './itemsWithModal.css'

const ItemsWithModal = ({ name, onAddItem, onRemoveItem, onSaveItem, form: Form }) => {
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
            {({ hide }) => (
              <Form
                onSubmit={(data) => {
                  onAddItem(data, { onSuccess: (created) => fields.push(created) })
                  hide()
                }}
              />
            )}
          </Modal>
          {fields.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
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
                            onDelete={() => {
                              const data = fields.value[index]
                              fields.remove(index)
                              onRemoveItem(data)
                            }}
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
                        onSubmit={(data) => {
                          const old = fields.value[index]
                          fields.update(index, { ...old, ...data })
                          onSaveItem(data)
                          hide()
                        }}
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

ItemsWithModal.propTypes = {
  name: PropTypes.string.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onSaveItem: PropTypes.func.isRequired,
  form: PropTypes.func.isRequired,
}

export default ItemsWithModal
