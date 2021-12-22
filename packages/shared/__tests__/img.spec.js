import fs from 'fs'
import path from 'path'
import { isPng, isJpg, isGif, isImage, rect } from '../src/img'

describe('img', () => {
  const pngData = fs.readFileSync(path.resolve(__dirname, './assets/test.png'))
  const jpgData = fs.readFileSync(path.resolve(__dirname, './assets/test.jpg'))
  const gifData = fs.readFileSync(path.resolve(__dirname, './assets/test.gif'))

  const png = new File([pngData], 'img.png')
  const pngErr = new File([gifData], 'img.png')
  const jpg = new File([jpgData], 'img.jpg')
  const jpgErr = new File([pngData], 'img.jpg')
  const gif = new File([gifData], 'img.gif')
  const gifErr = new File([jpgData], 'img.gif')

  const unknown = new File(['1111'], 'unknown')

  test('isPng(not file) to false', async () => {
    expect(await isPng(null)).toBe(false)
  })

  test('isPng(not png file) to false', async () => {
    expect(await isPng(gif)).toBe(false)
  })

  test('isPng(not png file but extname is \'png\') to false', async () => {
    expect(await isPng(pngErr)).toBe(false)
  })

  test('isPng(png file but extname is not \'png\') to false', async () => {
    expect(await isPng(jpgErr)).toBe(false)
  })

  test('isPng(png file but extname is not \'png\', ignoreExt = true) to true', async () => {
    expect(await isPng(jpgErr, true)).toBe(true)
  })

  test('isPng(png file) to true', async () => {
    expect(await isPng(png)).toBe(true)
  })

  test('isJpg(not file) to false', async () => {
    expect(await isJpg(null)).toBe(false)
  })

  test('isJpg(not jpg file) to false', async () => {
    expect(await isJpg(png)).toBe(false)
  })

  test('isJpg(not jpg file but extname is \'jpg\') to false', async () => {
    expect(await isJpg(jpgErr)).toBe(false)
  })

  test('isJpg(jpg file but extname is not \'jpg\') to false', async () => {
    expect(await isJpg(gifErr)).toBe(false)
  })

  test('isJpg(jpg file but extname is not \'jpg\', ignoreExt = true) to true', async () => {
    expect(await isJpg(gifErr, true)).toBe(true)
  })

  test('isJpg(jpg file) to true', async () => {
    expect(await isJpg(jpg)).toBe(true)
  })

  test('isGif(not file) to false', async () => {
    expect(await isGif(null)).toBe(false)
  })

  test('isGif(not gif file) to false', async () => {
    expect(await isGif(jpg)).toBe(false)
  })

  test('isGif(not gif file but extname is \'gif\') to false', async () => {
    expect(await isGif(gifErr)).toBe(false)
  })

  test('isGif(gif file but extname is not \'gif\') to false', async () => {
    expect(await isGif(pngErr)).toBe(false)
  })

  test('isGif(gif file but extname is not \'gif\', ignoreExt = true) to true', async () => {
    expect(await isGif(pngErr, true)).toBe(true)
  })

  test('isGif(gif file) to true', async () => {
    expect(await isGif(gif)).toBe(true)
  })

  test('isImage(not file) to false', async () => {
    expect(await isImage(null)).toBe(false)
  })

  test('isImage(not png|jpe?g|gif file) to false', async () => {
    expect(await isImage(unknown)).toBe(false)
  })

  test('isImage(png file but extname is not \'png\') to true', async () => {
    expect(await isImage(jpgErr)).toBe(true)
  })

  test('isImage(png file) to true', async () => {
    expect(await isImage(png)).toBe(true)
  })

  test('rect(not file) to [0, 0]', async () => {
    expect(await rect(null)).toEqual([0, 0])
  })

  test('rect(not png|jpe?g|gif file) to [0, 0]', async () => {
    expect(await rect(unknown)).toEqual([0, 0])
  })

  test('rect(png file 12*6 but extname is not \'png\') to [12, 6]', async () => {
    expect(await rect(png)).toEqual([12, 6])
  })

  test('rect(png file 12*6) to [12, 6]', async () => {
    expect(await rect(png)).toEqual([12, 6])
  })
})
