/* eslint-disable import/prefer-default-export */
import capitalize from 'lodash/capitalize'

export const required = (value, field, form, name) => (value ? undefined : `${capitalize(name)} is required`)
