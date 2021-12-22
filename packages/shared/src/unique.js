function generateRandomData (len) {
  const array = new Array(len)
  for (let i = 0; i < len; i++) {
    array[i] = 256 * Math.random() | 0
  }
  return array
}

function generateRandomString (len, alphabet) {
  const randomData = generateRandomData(len)
  const chars = new Array(len)
  for (let i = 0; i < len; i++) {
    chars[i] = alphabet.charCodeAt(randomData[i] % alphabet.length)
  }
  return String.fromCharCode(...chars)
}

export function uuid () {
  const crypto = window?.crypto
  if (crypto) {
    return crypto.randomUUID()
  }
  const hexDigits = '0123456789abcdef'
  const s = generateRandomString(36, hexDigits).split('')
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export function randomID () {
  return Math.random().toString().slice(2)
}
