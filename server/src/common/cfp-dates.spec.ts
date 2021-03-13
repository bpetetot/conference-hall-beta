import { isCfpFinished, isCfpOpened } from './cfp-dates'

describe('#isCfpOpened', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should return false if type not unknown', () => {
    // given
    jest.setSystemTime(new Date('2020-02-27T23:59:58.000Z'))
    const start = new Date('2020-02-27T00:00:00.000Z')
    const end = new Date('2020-02-27T23:59:59.000Z')
    // when
    const result = isCfpOpened('FOO', start, end)
    // then
    expect(result).toBe(false)
  })

  describe('For CONFERENCE', () => {
    test('should return false if no cfp start or end are defined', () => {
      // when
      jest.setSystemTime(new Date('2020-02-27T13:00:00.000Z'))
      const result = isCfpOpened('CONFERENCE', null, null)
      // then
      expect(result).toBe(false)
    })

    test('should return true if todays date is between cfp dates', () => {
      // given
      jest.setSystemTime(new Date('2020-02-27T23:59:58.000Z'))
      const start = new Date('2020-02-27T00:00:00.000Z')
      const end = new Date('2020-02-27T23:59:59.000Z')
      // when
      const result = isCfpOpened('CONFERENCE', start, end)
      // then
      expect(result).toBe(true)
    })

    test('should return false if todays date before cfp start', () => {
      // given
      jest.setSystemTime(new Date('2020-02-25T23:59:59.000Z'))
      const start = new Date('2020-02-26T00:00:00.000Z')
      const end = new Date('2020-02-28T23:59:59.000Z')
      // when
      const result = isCfpOpened('CONFERENCE', start, end)
      // then
      expect(result).toBe(false)
    })

    test('should return false if todays date after cfp end', () => {
      // given
      jest.setSystemTime(new Date('2020-02-29T00:00:00.000Z'))
      const start = new Date('2020-02-26T00:00:00.000Z')
      const end = new Date('2020-02-28T23:59:59.000Z')
      // when
      const result = isCfpOpened('CONFERENCE', start, end)
      // then
      expect(result).toBe(false)
    })
  })

  describe('For MEETUP', () => {
    test('should return false if no cfp start is defined', () => {
      // when
      jest.setSystemTime(new Date('2020-02-27T13:00:00.000Z'))
      const result = isCfpOpened('MEETUP', null)
      // then
      expect(result).toBe(false)
    })

    test('should return true if todays after cfp start', () => {
      // given
      jest.setSystemTime(new Date('2020-02-27T23:59:58.000Z'))
      const start = new Date('2020-02-27T00:00:00.000Z')
      // when
      const result = isCfpOpened('MEETUP', start)
      // then
      expect(result).toBe(true)
    })

    test('should return false if todays date before cfp start', () => {
      // given
      jest.setSystemTime(new Date('2020-02-25T23:59:59.000Z'))
      const start = new Date('2020-02-26T00:00:00.000Z')
      // when
      const result = isCfpOpened('MEETUP', start)
      // then
      expect(result).toBe(false)
    })
  })
})

describe('#isCfpFinished', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should return false if end date null', () => {
    // given
    const end = null
    // when
    const result = isCfpFinished(end)
    // then
    expect(result).toBe(false)
  })

  test('should return false if today before end date', () => {
    // given
    jest.setSystemTime(new Date('2020-02-27T23:59:58.000Z'))
    const end = new Date('2020-02-28T00:00:00.000Z')
    // when
    const result = isCfpFinished(end)
    // then
    expect(result).toBe(false)
  })

  test('should return true if today after end date', () => {
    // given
    jest.setSystemTime(new Date('2020-02-27T23:59:58.000Z'))
    const end = new Date('2020-02-26T00:00:00.000Z')
    // when
    const result = isCfpFinished(end)
    // then
    expect(result).toBe(true)
  })
})
