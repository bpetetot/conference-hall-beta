/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import Category from './category'
import CategoryFormModal from './categoryForm'

import './categoriesForm.css'

class CategoriesForm extends React.Component {
  onAddCategory = (data) => {
    const { fields, closeModal } = this.props
    fields.push(data)
    closeModal()
  }

  onUpdateCategory = index => (data) => {
    const { fields, closeModal } = this.props
    const old = fields.get(index)
    fields.remove(index)
    fields.insert(index, { ...old, ...data })
    closeModal()
  }

  onRemoveCategory = index => () => {
    this.props.fields.remove(index)
  }

  render() {
    const { fields, openModal } = this.props
    return (
      <div className="categories-form">
        {fields.map((category, index) => (
          <div key={index}>
            <Field
              name={category}
              component={({ input }) => (
                <Category
                  onEdit={openModal(`category-${index}`)}
                  onDelete={this.onRemoveCategory(index)}
                  {...input.value}
                />
              )}
            />
            <CategoryFormModal
              modalId={`category-${index}`}
              initialValues={fields.get(index)}
              edit
              onSubmit={this.onUpdateCategory(index)}
            />
          </div>
        ))}
        <button className="btn btn-primary" type="button" onClick={openModal('create-category')}>
          <i className="fa fa-plus" />
        </button>
        <CategoryFormModal modalId="create-category" onSubmit={this.onAddCategory} />
      </div>
    )
  }
}

CategoriesForm.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default CategoriesForm
