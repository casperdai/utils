import { uuid, randomID } from '../src/unique'

describe('unique', () => {
  test('uuid', () => {
    expect(uuid()).not.toBe(uuid())
  })

  test('randomID', () => {
    expect(randomID()).not.toBe(randomID())
  })
})
