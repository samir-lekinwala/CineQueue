const { VITE_API_KEY } = import.meta.env

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${VITE_API_KEY}`,
  },
}
export async function getMovieById(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  )
  const data = await response.json()
  return data
}
export async function getRecomendationsByMovieId(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
    options
  )
  const data = await response.json()
  return data
}

export async function searchMovie(searchTerm: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    options
  )
  const data = await response.json()
  return data
}

export async function getUpcomingMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    options
  )
  const data = await response.json()
  return data
}
export async function getTopRatedMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
  const data = await response.json()
  return data
}
export async function getPopularMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    options
  )
  const data = await response.json()
  return data
}
export async function getTrailerForMovie(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  )
  const data = await response.json()
  const result = await data.results.find(
    (element: any) => element.type == 'Trailer'
  )
  return result.key

  // return data
}

export async function getMovies() {
  return {
    popular: await getPopularMovies(),
    topRated: await getTopRatedMovies(),
    upcoming: await getUpcomingMovies(),
  }
}
