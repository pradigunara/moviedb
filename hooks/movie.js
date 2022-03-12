import _ from 'lodash'
import { useRequest } from 'ahooks'
import axios from 'axios'
import { API_KEY, BASE_API_URL } from 'constants'

export function useMovieList({ genreId } = {}) {
  const { data, error, loading } = useRequest(() =>
    axios
      .get(`${BASE_API_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: 'popularity.desc',
          with_genres: genreId,
        },
      })
      .then(_.property('data'))
  )

  return { data, error, loading }
}
