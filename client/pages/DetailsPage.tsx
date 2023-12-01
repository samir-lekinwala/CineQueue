import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
// import { getMovieById, getTrailerForMovie } from '../api/moviesApi'
import { getDetailById, getTrailer } from '../api/combinedApi'
import TvShowDetails from '../components/TvShowDetails'
import MovieDetails from '../components/MovieDetails'

function DetailsPage() {
  const { id, type } = useParams()

  async function getDetails() {
    const result = await getDetailById(type, Number(id))
    return result
  }

  const { data: trailer } = useQuery({
    queryKey: ['trailer'],
    queryFn: getTrailerResult,
  })

  async function getTrailerResult() {
    const result = await getTrailer(type, Number(id))
    return result
  }

  console.log(trailer)

  const {
    data: details,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['details'],
    queryFn: getDetails,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)
  console.log(details)

  return (
    <div className="bg-black snap-proximity snap-x snap-start">
      <div className="snap-center ...">
        <iframe
          title=" "
          id="player"
          className="
        w-full aspect-video"
          // absolute z-10 w-auto
          // min-w-full min-h-full max-w-none
          frameBorder="0"
          allowFullScreen
          src={
            // {`${youtubeLink}${trailer}`}
            `http://www.youtube.com/embed/${trailer}?autoplay=1&controls=0&enablejsapi=1&origin=http://example.com`
          }
        ></iframe>
      </div>
      <div className="snap-center">
        {type == 'show' ? (
          <TvShowDetails details={details} />
        ) : (
          <MovieDetails details={details} />
        )}
      </div>
      {/* DetailsPage
      <h1>{details.original_title}</h1>
      <p>{type}</p> */}
    </div>
  )
}

export default DetailsPage
