/* eslint-disable import/prefer-default-export */
import crud from './crud'

const betaAccess = crud('betaAccess', 'id')

export const isValidBetaAccessKey = async (accessKey) => {
  const accessRef = await betaAccess.read(accessKey)
  return accessRef.exists
}
