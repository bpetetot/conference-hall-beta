/* eslint-disable no-underscore-dangle */
const admin = require('firebase-admin')
const isString = require('lodash/isString')
const pick = require('lodash/pick')
const first = require('lodash/first')

// ====================================
// Configuration
// ====================================

// service account credentials (need to be downloaded from firebase console)

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * MUST ACTIVATE GEOCODING API
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
const googleMapsClient = require('@google/maps').createClient({
  key: 'YOUR API KEY HERE',
  Promise,
})
const serviceAccount = require('./serviceAccount.json')

// initialize app credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const { updateUsers, updateEvents } = require('./updates')

// eslint-disable-next-line
const getAddressComponent = (name, addressComponents) => pick(first(addressComponents.filter(component => component.types.includes(name))), [
  'short_name',
  'long_name',
])

const main = async () => {
  // update users address
  await updateUsers(async (user) => {
    if (!user.city) return null

    const response = await googleMapsClient.geocode({ address: user.city }).asPromise()
    const { results } = (response && response.json) || {}

    const result = first(results)
    if (!result) return null

    const country = getAddressComponent('country', result.address_components)
    const locality = getAddressComponent('locality', result.address_components)

    // console.log({
    //   formattedAddress: user.city,
    //   locality,
    //   country,
    //   latLng: result.geometry.location,
    // })
    // return null

    return {
      address: {
        formattedAddress: user.city,
        locality,
        country,
        latLng: result.geometry.location,
      },
    }
  })

  // update events address
  await updateEvents(async (event) => {
    if (!event.address || !isString(event.address)) return null

    const response = await googleMapsClient.geocode({ address: event.address }).asPromise()
    const { results } = (response && response.json) || {}


    const result = first(results)
    if (!result) return null

    const country = getAddressComponent('country', result.address_components)
    const locality = getAddressComponent('locality', result.address_components)

    // console.log({
    //   formattedAddress: event.address,
    //   locality,
    //   country,
    //   latLng: result.geometry.location,
    // })
    // return null

    return {
      oldAddress: event.address,
      address: {
        formattedAddress: event.address,
        locality,
        country,
        latLng: result.geometry.location,
      },
    }
  })
  console.log('🎉 Finished')
}

main()
