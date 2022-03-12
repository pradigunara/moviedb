import _ from 'lodash'
import style from 'styles/Header.module.css'
import { useMovieList } from 'hooks/movie'
import { imageURL } from 'utils'
import { Col, Row, Carousel } from 'antd'

export default function PageHeader() {
  const movieList = useMovieList()

  const backdropPaths =
    movieList?.data?.results?.map((movie) => movie?.backdrop_path) || []

  console.log('bdp', backdropPaths)

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  return (
    <header className={style.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>this is header</div>
        <ImageGrid backdropPaths={backdropPaths} />
      </div>
    </header>
  )
}

function ImageGrid({ backdropPaths }) {
  const chunkPaths = _.chunk(backdropPaths, 10)

  return (
    <div style={{ opacity: '0.6', marginRight: '1em' }}>
      {chunkPaths.map((chunk, idx) => (
        <div key={idx}>
          {chunk.map((path) => (
            <img width="60" src={imageURL(path, 'BACKDROP')} />
          ))}
        </div>
      ))}
    </div>
  )
}
