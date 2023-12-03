import * as moviesApi from './moviesApi'

const { options } = moviesApi

export async function getTrailer(type: string | unknown, id: number) {
  if (type == 'show') {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
    const data = await response.json()
    const result = await data.results.find(
      (element: any) => element.type == 'Trailer'
    )
    return result.key
  } else if (type == 'movie') {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
    const data = await response.json()
    const result = await data.results.find(
      (element: any) => element.type == 'Trailer'
    )
    return result.key
  }
}

export async function getDetailById(type: string | unknown, id: number) {
  if (type == 'show') {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      options
    )
    const data = await response.json()
    return data
  } else if (type == 'movie') {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    )
    const data = await response.json()
    return data
  }
}

export async function getRecomendationsById(type: string, id: number) {
  if (type == 'show') {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`,
      options
    )
    const data = await response.json()
    return data
  } else if (type == 'movie') {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    )
    const data = await response.json()
    return data
  }
}
