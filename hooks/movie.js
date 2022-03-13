import _ from 'lodash'
import { useInfiniteScroll, useRequest } from 'ahooks'
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

export function useScrollLoadMovieList({ genreId } = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const pageSize = 20

  const getLoadMoreList = async (page) => {
    const data = await axios
      .get(`${baseUrl}/discover/movie`, {
        params: {
          api_key: apiKey,
          sort_by: 'popularity.desc',
          with_genres: genreId,
          page
        },
      })
      .then(_.property('data'))

    return {
      list: data?.results,
      total: page * pageSize,
      lastPage: data?.total_pages,
      page
    }
  }

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / pageSize) + 1 : 1;
      return getLoadMoreList(page, pageSize)
    }
  );

  return { data, loading, loadMore, loadingMore, noMore }
}
