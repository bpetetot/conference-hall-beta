/* eslint-disable react/prop-types */
import React from 'react'
import RadioBox from './radioBox'

const renderRadio = ({ input, label }) => <RadioBox {...input}>{label}</RadioBox>

export default renderRadio
