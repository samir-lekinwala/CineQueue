import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { getMovieById, getTrailerForMovie } from '../api/moviesApi'
import { getDetailById, getTrailer } from '../api/combinedApi'
import TvShowDetails from '../components/TvShowDetails'
import MovieDetails from '../components/MovieDetails'
import Trailer from '../components/Trailer'
import Recommendations from '../components/Recommendations'

function DetailsPage() {
  const { id, type } = useParams()

  const queryClient = useQueryClient()
  useEffect(() => {
    // Invalidate relevant queries when type or id changes
    queryClient.invalidateQueries(['details', type, id])
    queryClient.invalidateQueries(['trailer', type, id])
  }, [queryClient, type, id])

  async function getDetails() {
    const result = await getDetailById(type, Number(id))
    return result
  }

  const { data: trailer } = useQuery({
    queryKey: ['trailer', type, id],
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
    queryKey: ['details', type, id],
    queryFn: getDetails,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  return (
    <div className="bg-black snap-proximity snap-x snap-start">
      <div>
        {/* relative min-h-screen */}
        <Trailer trailer={trailer} />
      </div>
      <div className="snap-center">
        {type == 'show' ? (
          <TvShowDetails details={details} />
        ) : (
          <MovieDetails details={details} />
        )}
      </div>
      <Recommendations type={type} id={Number(id)} />
    </div>
  )
}

export default DetailsPage
