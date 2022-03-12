import ScrollContainer from 'react-indiana-drag-scroll'
import { useMovieList } from 'hooks/movie'
import { imageURL } from 'utils'
import { StarFilled } from '@ant-design/icons'

export default function MoviesGenre({ genreName, genreId, myList }) {
  const movieList = useMovieList({ genreId })

  const handleClick = (movie) => () => {
    myList.add(movie)
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
              {myList.has(movie?.id) && (
                <StarFilled
                  style={{
                    color: 'gold',
                    marginRight: '-2em',
                    zIndex: '100',
                  }}
                />
              )}
              <img
                key={movie?.id}
                height="200"
                src={imageURL(movie?.poster_path)}
                style={{ cursor: 'pointer' }}
                onClick={handleClick(movie)}
              />
            </>
          ))}
        </div>
      </ScrollContainer>
    </>
  )
}
