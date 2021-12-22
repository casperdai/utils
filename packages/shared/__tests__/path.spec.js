import { ext } from '../src/path'

describe('path', () => {
  test('ext(null) to \'\'', () => {
    expect(ext(null)).toBe('')
  })

  test('ext(123) to \'\'', () => {
    expect(ext(123)).toBe('')
  })

  test('ext({}) to \'\'', () => {
    expect(ext({})).toBe('')
  })

  test('ext(\'img\') to \'\'', () => {
    expect(ext('img')).toBe('')
  })

  test('ext(\'img.png\') to \'png\'', () => {
    expect(ext('img.png')).toBe('png')
  })

  test('ext(\'.png\') to \'\'', () => {
    expect(ext('.png')).not.toBe('png')
  })

  test('ext(\'a/b/c.png\') to \'png\'', () => {
    expect(ext('a/b/c.png')).toBe('png')
  })
})
