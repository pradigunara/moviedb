import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import style from 'styles/Header.module.css'
import { useMovieList } from 'hooks/movie'
import { imageURL } from 'utils'

export default function PageHeader() {
  const movieList = useMovieList()
  const [imageIndex, setImageIndex] = useState(0)
  const intervalRef = useRef(null)

  const backdropPaths =
    movieList?.data?.results?.map((movie) => movie?.backdrop_path) || []

  useEffect(() => {
    intervalRef.current = setInterval(
      () =>
        setImageIndex((index) =>
          index === backdropPaths.length ? 0 : index + 1
        ),
      3000
    )

    return () => clearInterval(intervalRef.current)
  }, [movieList])

  return (
    <header className={style.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>this is header</div>
        <img src={imageURL(backdropPaths[imageIndex], 'BACKDROP')} />
      </div>
    </header>
  )
}
