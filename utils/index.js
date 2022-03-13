export function imageURL(path, type = 'POSTER') {
  const posterUrl = process.env.NEXT_PUBLIC_BASE_POSTER_URL
  const backdropUrl = process.env.NEXT_PUBLIC_BASE_BACKDROP_URL

  return `${type === 'POSTER' ? posterUrl : backdropUrl}${path}`
}
