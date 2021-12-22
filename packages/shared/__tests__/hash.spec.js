import { md5, calculateHash, calculateHashByIdle } from '../src/hash'

describe('hash', () => {
  const blob = new Blob(['this is a test blob.'])

  test('md5(null) to null', () => {
    expect(md5(null)).toBe(null)
  })

  test('md5(\'Hi\') to \'c1a5298f939e87e8f962a5edfc206918\'', () => {
    expect(md5('Hi')).toBe('c1a5298f939e87e8f962a5edfc206918')
  })

  test('calculateHash(blob) to 32-bit string', async () => {
    expect((await calculateHash(blob)).length).toBe(32)
  })

  test('calculateHash(blob) === calculateHash(blob), blob.size = 20', async () => {
    expect(await calculateHash(blob)).toBe(await calculateHash(blob))
  })

  test('calculateHash(blob, chunkSize = 5) !== calculateHash(blob, chunkSize = 4), blob.size = 20', async () => {
    expect(await calculateHash(blob, 5)).not.toBe(await calculateHash(blob, 4))
  })

  test('calculateHashByIdle(blob) to 32-bit string', async () => {
    expect((await calculateHashByIdle(blob)).length).toBe(32)
  })

  test('calculateHashByIdle(blob, { progress }), blob.size = 20', async () => {
    const mockFn = jest.fn()
    await calculateHashByIdle(blob, { progress: mockFn })
    expect(mockFn).toHaveBeenCalledWith(0, 1)
    expect(mockFn).toHaveBeenLastCalledWith(1, 1)
  })

  test('calculateHashByIdle(blob, { chunkSize: 5, progress }), blob.size = 20', async () => {
    const mockFn = jest.fn()
    await calculateHashByIdle(blob, { chunkSize: 5, progress: mockFn })
    expect(mockFn).toHaveBeenCalledWith(0, 4)
    expect(mockFn).toHaveBeenCalledWith(1, 4)
    expect(mockFn).toHaveBeenCalledWith(2, 4)
    expect(mockFn).toHaveBeenLastCalledWith(4, 4)
  })

  test('calculateHashByIdle(blob) === calculateHashByIdle(blob), blob.size = 20', async () => {
    expect(await calculateHashByIdle(blob)).toBe(await calculateHashByIdle(blob))
  })

  test('calculateHashByIdle(blob, { chunkSize: 5 }) === calculateHashByIdle(blob, { chunkSize: 4 }), blob.size = 20', async () => {
    expect(await calculateHashByIdle(blob, { chunkSize: 5 })).toBe(await calculateHashByIdle(blob, { chunkSize: 4 }))
  })
})
