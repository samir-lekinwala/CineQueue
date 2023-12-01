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

  const youtubeLink = `https://www.youtube.com/watch?v=`

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

  return (
    <div>
      DetailsPage
      <h1>{movie.original_title}</h1>
      <video
        src={`${youtubeLink}${trailer}`}
        loop
        muted
        className="absolute z-10 w-auto  
        min-w-full min-h-full max-w-none"
      ></video>
      {/* <a href={`${youtubeLink}${trailer}`}>Trailer</a> */}
    </div>
  )
}

export default DetailsPage
