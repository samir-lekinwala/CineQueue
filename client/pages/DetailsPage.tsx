import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, getTrailerForMovie } from '../api/moviesApi'

function DetailsPage() {
  const { id, type } = useParams()

  async function getMovieDetail() {
    const result = await getMovieById(Number(id))
    return result
  }

  // async function getTrailer() {
  //   if (type == 'movie') {
  //     const result = await getTrailerForMovie(Number(id))
  //     return result
  //   } else if (type == 'show') {
  //     const result = await getTrailerForMovie(Number(id))
  //     return result
  //   }
  // }

  const { data: trailer } = useQuery({
    queryKey: ['trailer'],
    queryFn: getTrailer,
  })

  async function getTrailer() {
    const result = await getTrailerForMovie(Number(id))
    return result
    // const result = await trailer.results.find(
    //   (element: any) => element.type == 'Trailer'
    // )
    // return result.key
  }

  // console.log(trailer)
  console.log(trailer)
  // console.log(findTrailer())

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: getMovieDetail,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)
  console.log(movie)

  // const youtubeLink = `https://www.youtube.com/embed/watch?v=`
  return (
    <div>
      <iframe
        title={movie.id}
        id="player"
        // type="text/html"
        className="absolute z-10 w-auto  
        min-w-full min-h-full max-w-none"
        frameBorder="0"
        src={
          // {`${youtubeLink}${trailer}`}
          `http://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&enablejsapi=1&origin=http://example.com`
        }
      ></iframe>
      DetailsPage
      <h1>{movie.original_title}</h1>
      <p>{type}</p>
    </div>
  )
}

export default DetailsPage
