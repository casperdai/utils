export function ext (s) {
  const result = /(?!^)\.([^./\\]+)$/.exec(s)
  return result ? result[1] : ''
}
