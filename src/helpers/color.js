/* eslint-disable import/prefer-default-export */
import randomColor from 'randomcolor'

export const generateColor = (seed) => {
  if (!seed) return {}
  return randomColor({
    seed,
    luminosity: 'bright',
    hsla: 'rgb',
  })
}
