import _ from 'lodash'
import { useRequest } from 'ahooks'
import axios from 'axios'

export function useGenreList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  const { data, error, loading } = useRequest(() =>
    axios
      .get(`${baseUrl}/genre/movie/list`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
        },
      })
      .then(_.property('data.genres'))
  )

  return { data, error, loading }
}
