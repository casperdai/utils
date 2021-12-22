import sparkMd5 from 'spark-md5'
import { blobToArrayBuffer, createChunks } from './code'

export function md5 (s) {
  return typeof s === 'string' ? sparkMd5.hash(s) : null
}

export function calculateHash (blob, chunkSize = 2 * 1024 * 1024) {
  return new Promise(resolve => {
    const size = blob.size
    const chunks = [blob.slice(0, chunkSize)]

    let cur = chunkSize
    while (cur < size) {
      if (cur + chunkSize >= size) {
        chunks.push(blob.slice(cur, cur + chunkSize))
      } else {
        const mid = cur + chunkSize / 2
        const end = cur + chunkSize
        chunks.push(blob.slice(cur, cur + 2))
        chunks.push(blob.slice(mid, mid + 2))
        chunks.push(blob.slice(end - 2, end))
      }
      cur += chunkSize
    }

    resolve(blobToArrayBuffer(new Blob(chunks)).then(arrayBuffer => {
      const spark = new sparkMd5.ArrayBuffer()
      spark.append(arrayBuffer)
      return spark.end()
    }))
  })
}

export function calculateHashByIdle (blob, options = {}) {
  return new Promise(resolve => {
    const { chunkSize, progress } = options
    const chunks = createChunks(blob, chunkSize)
    const total = chunks.length
    const spark = new sparkMd5.ArrayBuffer()
    const appendToSpark = blob => blobToArrayBuffer(blob).then(arrayBuffer => spark.append(arrayBuffer))
    let count = 0
    const workLoop = async deadline => {
      while (count < total && deadline.timeRemaining() > 1) {
        await appendToSpark(chunks[count].chunk)
        count++
        progress && progress(count, total)
        if (count === total) {
          resolve(spark.end())
        }
      }
      count < total && window.requestIdleCallback(workLoop)
    }
    progress && progress(count, total)
    window.requestIdleCallback(workLoop)
  })
}
