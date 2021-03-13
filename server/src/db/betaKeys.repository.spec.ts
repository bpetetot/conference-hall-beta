import { buildBetaKey } from '../../tests/builder/betaKey'
import { isBetaKeyValid } from './betaKeys.repository'

describe('Beta key repository', () => {
  describe('#isBetaKeyValid', () => {
    test('should return true if the key exists', async () => {
      // given
      const key = await buildBetaKey()
      // when
      const result = await isBetaKeyValid(key.uuid)
      //then
      expect(result).toBe(true)
    })

    test('should return false if the key does not exist', async () => {
      // given
      // when
      const result = await isBetaKeyValid('key1')
      //then
      expect(result).toBe(false)
    })
  })
})
