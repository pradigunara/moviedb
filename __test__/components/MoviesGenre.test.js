// __tests__/fetch.test.js
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import MoviesGenre from 'components/MoviesGenre'
import movieResponse from '__test__/data/movieresponse.json'

const server = setupServer(
  rest.get('/server/discover/movie', (req, res, ctx) => {
    return res(ctx.json(movieResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockMyList = {
  add: jest.fn(),
  has: jest.fn(),
}

test('render fetched image correctly', async () => {
  process.env.NEXT_PUBLIC_BASE_URL = '/server'
  render(
    <MoviesGenre genreId={100} genreName="testGenre" myList={mockMyList} />
  )

  const firstMovieTitle = movieResponse.results[0].title

  const moviesContainer = screen.getByTestId('movies-genre-container')
  await waitFor(() => within(moviesContainer).getByAltText(firstMovieTitle))

  const renderedImages = within(moviesContainer).getAllByRole('img')

  expect(renderedImages).toHaveLength(20)
})

test('click image will add to my list', async () => {
  process.env.NEXT_PUBLIC_BASE_URL = '/server'
  render(
    <MoviesGenre genreId={100} genreName="testGenre" myList={mockMyList} />
  )

  const firstMovieTitle = movieResponse.results[0].title

  const moviesContainer = screen.getByTestId('movies-genre-container')
  await waitFor(() => within(moviesContainer).getByAltText(firstMovieTitle))

  const firstMovie = within(moviesContainer).getByAltText(firstMovieTitle)
  fireEvent.click(firstMovie)

  expect(mockMyList.add).toHaveBeenCalledTimes(1)
})
