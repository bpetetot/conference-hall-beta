import find from 'lodash/find'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

const questions = [
  {
    name: 'gender',
    label: "What's your gender?",
    shortLabel: 'Gender',
    organizerInfo: '(male, female, genderless)',
    type: 'radio',
    answers: [
      { name: 'male', label: 'Male' },
      { name: 'female', label: 'Female' },
      { name: 'genderless', label: 'Genderless' },
    ],
  },
  {
    name: 'tshirt',
    label: "What's your Tshirt size?",
    shortLabel: 'Tshirt size',
    organizerInfo: '(S, M, L, XL, XXL, XXXL)',
    type: 'radio',
    answers: [
      { name: 'S', label: 'S' },
      { name: 'M', label: 'M' },
      { name: 'L', label: 'L' },
      { name: 'XL', label: 'XL' },
      { name: 'XXL', label: 'XXL' },
      { name: 'XXXL', label: 'XXXL' },
    ],
  },
  {
    name: 'accomodation',
    label: 'Do you need accommodation funding? (Hotel, AirBnB...)',
    shortLabel: 'Accommodation funding',
    type: 'radio',
    answers: [{ name: 'yes', label: 'Yes' }, { name: 'no', label: 'No' }],
  },
  {
    name: 'transports',
    label: 'Do you need transports funding?',
    shortLabel: 'Transports funding',
    type: 'checkbox',
    answers: [
      { name: 'taxi', label: 'Taxi' },
      { name: 'train', label: 'Train' },
      { name: 'plane', label: 'Plane' },
    ],
  },
  {
    name: 'diet',
    label: 'Do you have any special diet restrictions?',
    shortLabel: 'Diet restrictions',
    organizerInfo: '(vegetarian, vegan, halal, gluten-free, nut allergy)',
    type: 'checkbox',
    answers: [
      { name: 'vegetarian', label: 'Vegetarian' },
      { name: 'vegan', label: 'Vegan' },
      { name: 'halal', label: 'Halal' },
      { name: 'gluten-free', label: 'Gluten-free' },
      { name: 'nut allergy', label: 'Nut allergy' },
    ],
  },
  {
    name: 'info',
    label: 'Do you have specific information to share?',
    shortLabel: 'More info',
    type: 'text',
  },
]

export const getQuestion = name => find(questions, { name })

export const getAnswer = (question, name) => find(question.answers, { name })

export const getAnswersLabel = (questionName, answer) => {
  if (!answer) return undefined

  const question = getQuestion(questionName)
  if (question.type === 'text') {
    return answer
  }
  if (question.type === 'checkbox') {
    const validAnswers = omitBy(answer, value => !value)
    if (isEmpty(validAnswers)) return undefined
    return Object.keys(validAnswers)
      .map(a => getAnswer(question, a).label)
      .join(', ')
  }
  return getAnswer(question, answer).label
}

export default questions
