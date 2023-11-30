import * as moviesApi from './moviesApi'

const { options } = moviesApi

//this api call will get a tv show by id, can also get runtime data from it.
export async function getShowById(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    options
  )
  const data = await response.json()
  return data
}
export async function searchShow(searchTerm: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    options
  )
  const data = await response.json()
  return data
}

//recomendations based on tv show id
export async function getRecomendationsById(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    options
  )
  const data = await response.json()
  return data
}
export async function getTopRatedTvShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`,
    options
  )
  const data = await response.json()
  return data
}
export async function getPopularTvShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,
    options
  )
  const data = await response.json()
  return data
}

export async function getTvShows() {
  return {
    topRated: await getTopRatedTvShows(),
    popular: await getPopularTvShows(),
  }
}
