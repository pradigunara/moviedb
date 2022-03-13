import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import MyMovieList from 'components/MyMovieList'
import movieResponse from '__test__/data/movieresponse.json'

const mockMyList = {
  remove: jest.fn(),
  values: jest.fn(),
}

describe('test MyMovieList component', () => {
  const firstMovie = movieResponse.results[0]

  beforeEach(async () => {
    mockMyList.values.mockReturnValue(movieResponse.results)

    render(<MyMovieList myList={mockMyList} />)

    const myListContainer = screen.getByTestId('mylist-container')
    await waitFor(() => within(myListContainer).getByAltText(firstMovie.title))
  })

  test('render saved movies correctly', async () => {
    const myListContainer = screen.getByTestId('mylist-container')
    const renderedImages = within(myListContainer).getAllByRole('img')

    expect(renderedImages).toHaveLength(movieResponse.results.length)
  })

  test('delete button appeared on hover', async () => {
    const firstMovieImage = screen.getByTestId(`mylist-image-${firstMovie.id}`)

    fireEvent.mouseEnter(firstMovieImage)
    const deleteButton = within(firstMovieImage).getByText('Delete')
    expect(deleteButton).not.toBeUndefined()

    fireEvent.mouseLeave(firstMovieImage)
    expect(() => within(firstMovieImage).getByText('Delete')).toThrowError()
  })

  test('clicking delete button will remove from saved movies', async () => {
    const firstMovieImage = screen.getByTestId(`mylist-image-${firstMovie.id}`)

    fireEvent.mouseEnter(firstMovieImage)
    const deleteButton = within(firstMovieImage).getByText('Delete')

    fireEvent.click(deleteButton)
    expect(mockMyList.remove).toHaveBeenCalledTimes(1)
    expect(mockMyList.remove).toHaveBeenCalledWith(
      expect.objectContaining({
        id: firstMovie.id,
      })
    )
  })
})
