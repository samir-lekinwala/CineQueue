import * as moviesApi from './moviesApi'

const { options } = moviesApi

export async function getGenreMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    options
  )
  const data = await response.json()
  return data
}
export async function getGenreTvShow() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/tv/list?language=en',
    options
  )
  const data = await response.json()
  return data
}
