import { ext } from './path'
import { blobToHex } from './code'

export async function isPng (file, ignoreExt = false) {
  try {
    if (!ignoreExt && ext(file.name) !== 'png') {
      return false
    }
    const ret = await blobToHex(file.slice(0, 8))
    return ret === '89 50 4E 47 0D 0A 1A 0A'
  } catch {
    return false
  }
}

export async function isJpg (file, ignoreExt = false) {
  try {
    if (!ignoreExt) {
      const extName = ext(file.name)
      if (extName !== 'jpg' && extName !== 'jpeg') {
        return false
      }
    }
    const start = await blobToHex(file.slice(0, 2))
    const tail = await blobToHex(file.slice(-2))
    return start === 'FF D8' && tail === 'FF D9'
  } catch {
    return false
  }
}

export async function isGif (file, ignoreExt = false) {
  try {
    if (!ignoreExt && ext(file.name) !== 'gif') {
      return false
    }
    const ret = await blobToHex(file.slice(0, 6))
    return ret === '47 49 46 38 39 61' || ret === '47 49 46 38 37 61'
  } catch {
    return false
  }
}

export async function isImage (file) {
  switch (true) {
    case await isPng(file, true):
    case await isJpg(file, true):
    case await isGif(file, true):
      return true
    default:
      return false
  }
}

export async function rect (file) {
  let rect
  let reverse = false
  switch (true) {
    case await isPng(file, true):
      rect = [18, 22]
      break
    case await isJpg(file, true):
      rect = [parseInt('A3', 16), parseInt('A5', 16)]
      break
    case await isGif(file, true):
      rect = [6, 8]
      reverse = true
      break
    default:
      return [0, 0]
  }

  let width = await blobToHex(file.slice(rect[0], rect[0] + 2))
  let height = await blobToHex(file.slice(rect[1], rect[1] + 2))

  if (reverse) {
    width = [width.slice(3, 5), width.slice(0, 2)].join(' ')
    height = [height.slice(3, 5), height.slice(0, 2)].join(' ')
  }

  return [parseInt(width.replace(' ', ''), 16), parseInt(height.replace(' ', ''), 16)]
}

export function preview (file) {
  return URL.createObjectURL(file)
}
