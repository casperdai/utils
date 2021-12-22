export function blobToBinaryString (blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.readAsBinaryString(blob)
  })
}

export async function blobToHex (blob) {
  const val = await blobToBinaryString(blob)
  return val.split('')
          .map(v => v.charCodeAt().toString(16).toUpperCase().padStart(2, '0'))
          .join(' ')
}

export function blobToArrayBuffer (blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(blob)
  })
}

export function blobToDataURL (blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}

export function createChunks (blob, chunkSize = 1 * 1024 * 1024) {
  const chunks = []
  try {
    let cur = 0
    while (cur < blob.size) {
      chunks.push({ index: cur, chunk: blob.slice(cur, cur + chunkSize) })
      cur += chunkSize
    }
  } catch (e) {
    console.warn(e)
  }
  return chunks
}

export function uint8AarryToString (buffer) {
  const len = buffer.length
  let out = ''
  let i = 0
  let c, char2, char3

  while (i < len) {
    c = buffer[i++]
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c)
        break
      case 12:
      case 13:
        // 110x xxxx 10xx xxxx
        char2 = buffer[i++]
        out += String.fromCharCode(
          ((c & 0x1F) << 6) | (char2 & 0x3F)
        )
        break
      case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = buffer[i++]
        char3 = buffer[i++]
        out += String.fromCharCode(
          ((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0)
        )
        break
      default:
        out += String.fromCharCode(c)
        break
    }
  }

  return out
}

export function binaryStringToUint8Array (binaryString) {
  const length = binaryString.length
  const uint8Array = new Uint8Array(length)
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i)
  }
  return uint8Array
}

export function base64ToBlob (base64) {
  const result = /^data:(.+);base64,(.+)$/.exec(base64)
  if (result) {
    return new Blob([binaryStringToUint8Array(atob(result[2]))], { type: result[1] })
  }
  return null
}

export function byteLength (str) {
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) {
      s++
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2
    }
    if (code >= 0xDC00 && code <= 0xDFFF) {
      i--
    }
  }
  return s
}
