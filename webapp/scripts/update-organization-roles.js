/* eslint-disable no-underscore-dangle, no-console */
require('./helpers/initFirestore')

const { updateOrganizations } = require('./helpers/updates')

const main = async () => {
  await updateOrganizations(async organization => {
    const members = Object.keys(organization.members).reduce(
      (acc, next) => ({ ...acc, [next]: 'owner' }),
      {},
    )
    return {
      members,
    }
  })
}

main()
