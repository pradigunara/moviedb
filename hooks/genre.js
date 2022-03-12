import _ from 'lodash'
import { useRequest } from 'ahooks'
import axios from 'axios'
import { API_KEY, BASE_API_URL } from 'constants'

export function useGenreList() {
  const { data, error, loading } = useRequest(() =>
    axios
      .get(`${BASE_API_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      })
      .then(_.property('data.genres'))
  )

  return { data, error, loading }
}
