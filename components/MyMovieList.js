import ScrollContainer from 'react-indiana-drag-scroll'
import { useState } from 'react'
import { imageURL } from 'utils'
import { Button } from 'antd'
import ZoomAnimate from './ZoomAnimate'

export default function MyMovieList({ myList }) {
  const handleClick = (movie) => {
    myList.remove(movie)
  }

  const listItems = myList.values()

  return (
    <>
      <h2>My List</h2>
      <ScrollContainer
        style={{ height: '220px', marginBottom: '2em' }}
        vertical={false}
        hideScrollbars={false}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: '1em',
          }}
        >
          {listItems.length === 0
            ? 'Nothing here! Scroll to discover more'
            : listItems.map((movie) => (
              <ZoomAnimate key={movie?.id}>
                <MyListImage
                  key={movie?.id}
                  movie={movie}
                  onDelete={handleClick}
                />
              </ZoomAnimate>
              ))}
        </div>
      </ScrollContainer>
    </>
  )
}

function MyListImage({ movie, onDelete }) {
  const [hovered, setHovered] = useState(false)

  const handleDelete = () => onDelete(movie)

  return (
    <div
      style={{
        height: '200',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img key={movie?.id} height="200" src={imageURL(movie?.poster_path)} />
      {hovered && (
        <Button
          style={{ marginTop: '-80%', marginLeft: '1em', marginRight: '1em' }}
          type="primary"
          danger
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </div>
  )
}
