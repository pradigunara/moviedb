import { useEffect, useRef, useState } from 'react'
import style from 'styles/Header.module.css'
import { useMovieList } from 'hooks/movie'
import { imageURL } from 'utils'
import SlideAnimate from './SlideAnimate'

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
          index + 1 === backdropPaths.length ? 0 : index + 1
        ),
      6000
    )

    return () => clearInterval(intervalRef.current)
  }, [movieList])

  return (
    <header className={style.header}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <h1 style={{ fontSize: '4em', marginLeft: '2em' }}>MovieList</h1>
        <SlideAnimate key={imageIndex}>
          <img
            src={imageURL(backdropPaths[imageIndex], 'BACKDROP')}
            height="160px"
          />
        </SlideAnimate>
      </div>
    </header>
  )
}
