import algoliasearch from 'algoliasearch/lite'

export default (config = {}) => {
  const client = algoliasearch(config.id, config.key)

  return {
    getDriver: () => ({
      getIndex: name => client.initIndex(name),
    }),
  }
}
