import _ from 'lodash'
import { useRequest } from 'ahooks'
import axios from 'axios'

export function useMovieList({ genreId } = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  const { data, error, loading } = useRequest(() =>
    axios
      .get(`${baseUrl}/discover/movie`, {
        params: {
          api_key: apiKey,
          sort_by: 'popularity.desc',
          with_genres: genreId,
        },
      })
      .then(_.property('data'))
  )

  return { data, error, loading }
}
