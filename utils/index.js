import { BASE_POSTER_URL, BASE_BACKDROP_URL } from 'constants'

export function imageURL(path, type = 'POSTER') {
  return `${type === 'POSTER' ? BASE_POSTER_URL : BASE_BACKDROP_URL}${path}`
}
