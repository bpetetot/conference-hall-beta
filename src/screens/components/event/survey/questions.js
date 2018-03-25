export default [
  {
    name: 'gender',
    label: "What's your gender?",
    organizerInfo: '(male, female, no gender)',
    type: 'radio',
    answers: [
      { name: 'male', label: 'Male' },
      { name: 'female', label: 'Female' },
      { name: 'nogender', label: 'No gender' },
    ],
  },
  {
    name: 'tshirt',
    label: "What's your Tshirt size?",
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
    label: 'Do you need accommodation funding?',
    type: 'radio',
    answers: [{ name: 'yes', label: 'Yes' }, { name: 'no', label: 'No' }],
  },
  {
    name: 'transports',
    label: 'Do you need transports funding?',
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
    label: 'Do you have particular information to share?',
    type: 'text',
  },
]
