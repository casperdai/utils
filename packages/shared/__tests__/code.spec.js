import { blobToBinaryString, blobToHex, blobToArrayBuffer, createChunks } from '../src/code'

describe('code', () => {
  const blobData = new Blob(['this is a test blob.'])

  test('blobToString(not Blob)', async () => {
    await expect(blobToBinaryString(null)).rejects.toThrow()
  })

  test('blobToString(Blob)', async () => {
    await expect(blobToBinaryString(blobData)).resolves.toBe('this is a test blob.')
  })

  test('blobToHex(not Blob)', async () => {
    await expect(blobToHex(null)).rejects.toThrow()
  })

  test('blobToHex(Blob)', async () => {
    await expect(blobToHex(blobData)).resolves.toBe('74 68 69 73 20 69 73 20 61 20 74 65 73 74 20 62 6C 6F 62 2E')
  })

  test('blobToArrayBuffer(not Blob)', () => {
    expect(blobToArrayBuffer(null)).rejects.toThrow()
  })

  test('blobToArrayBuffer(Blob)', async () => {
    await expect(blobToBinaryString(new Blob([await blobToArrayBuffer(blobData)]))).resolves.toBe(await blobToBinaryString(blobData))
  })

  test('createChunks(not Blob) to []', () => {
    expect(createChunks(null)).toEqual([])
  })

  test('createChunks(Blob)', async () => {
    const chunks = createChunks(blobData)
    expect(chunks.length).toBe(1)
    expect(await blobToBinaryString(chunks[0].chunk)).toBe('this is a test blob.')
  })

  test('createChunks(Blob, chunkSize = 4)', async () => {
    const chunks = createChunks(blobData, 4)
    expect(chunks.length).toBe(5)
    expect(await blobToBinaryString(chunks[0].chunk)).toBe('this')
    expect(await blobToBinaryString(chunks[1].chunk)).toBe(' is ')
    expect(await blobToBinaryString(chunks[2].chunk)).toBe('a te')
    expect(await blobToBinaryString(chunks[3].chunk)).toBe('st b')
    expect(await blobToBinaryString(chunks[4].chunk)).toBe('lob.')
  })
})
