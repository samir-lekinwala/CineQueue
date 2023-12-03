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
    `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`,
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
export async function getTrendingTvShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?language=en`,
    options
  )
  const data = await response.json()
  return data
}
export async function getTrailerForShow(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
    options
  )
  const data = await response.json()
  const result = await data.results.find(
    (element: any) => element.type == 'Trailer'
  )
  return result.key
}

// path https://api.themoviedb.org/3/tv/series_id/season/season_number?language=en-US
// Don't do this without broswer side throughput limiting
// Build request error handling
export async function getSeasonsForShow(id: number, numberOfSeasons: number) {
  const requests = []

  for (
    let seasonNumber = 1;
    seasonNumber <= numberOfSeasons;
    seasonNumber += 1
  ) {
    requests.push(
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`,
        options
      ).then((response) => response.json())
    )
  }

  return Promise.all(requests)
}

console.log('tv show trailer ', getTrailerForShow(1429))

export async function getTvShows() {
  return {
    topRated: await getTopRatedTvShows(),
    popular: await getPopularTvShows(),
    trending: await getTrendingTvShows(),
  }
}
