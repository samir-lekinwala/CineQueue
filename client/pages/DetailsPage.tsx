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

  // queryClient.invalidateQueries({ queryKey: ['details'] })
  // queryClient.invalidateQueries({ queryKey: ['trailer'] })
  const { data: trailer } = useQuery({
    queryKey: ['trailer', type, id],
    queryFn: () => getTrailer(type as string, Number(id)),
  })
  console.log(trailer)

  const {
    data: details,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['details', type, id],
    queryFn: () => getDetailById(type as string, Number(id)),
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }
  console.log(details)

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
