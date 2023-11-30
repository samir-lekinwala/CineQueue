import request from 'superagent'

const apiKey = '8d53543ff2c114e9aa7906279028d1de'

const movieUrlTrending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&media_type=movie`
const movieUrlUpcoming = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`

// const listUrl = '/api/v1/movielist'

export async function getTrendingMovies() {
  const res = await request.get(movieUrlTrending)
  // console.log(res.body.results)
  return res.body.results
}

export async function getMoviesUpcoming() {
  const res = await request.get(movieUrlUpcoming)
  // console.log(res.body.results)
  return res.body.results
}

// export async function addMovie(id: number, name: string) {
//   return request.post(listUrl).send({ id, name })
// }
