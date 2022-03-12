import _ from 'lodash'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useMovieList } from '../hooks/movie'
import { imageURL } from '../utils'
import { useLocalStorageState } from 'ahooks'
import {StarFilled} from '@ant-design/icons'

export default function MoviesGenre({ genreName, genreId }) {
  const movieList = useMovieList({ genreId })
  const [myList, setMyList] = useLocalStorageState('mylist', {
    defaultValue: new Set(),
    serializer: value => JSON.stringify(Array.from(value)),
    deserializer: value => new Set(JSON.parse(value))
  })

  const handleClick = (id) => () => {
    if (myList.has(id)) {
      return
    }

    myList.add(id)
    setMyList(new Set([...myList]))
  }

  return (
    <>
      <h2>{genreName}</h2>
      <ScrollContainer
        style={{ height: '220px', marginBottom: '2em' }}
        vertical={false}
        hideScrollbars={false}
      >
        <div
          style={{ display: 'flex', flexDirection: 'row', columnGap: '1em' }}
        >
          {movieList?.data?.results?.map((movie) => (
            <>
              { myList.has(movie?.id) && <StarFilled
                style={{
                  color: 'goldenrod',
                  marginRight: '-2em',
                  zIndex: '100',
                }}
              />}
              <img
                key={movie?.id}
                height="200"
                src={imageURL(movie?.poster_path)}
                style={{ cursor: 'pointer' }}
                onClick={handleClick(movie?.id)}
              />
            </>
          ))}
        </div>
      </ScrollContainer>
    </>
  )
}
