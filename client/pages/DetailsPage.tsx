import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { getMovieById, getTrailerForMovie } from '../api/moviesApi'
import { getDetailById, getTrailer } from '../api/combinedApi'
import TvShowDetails from '../components/TvShowDetails'
import MovieDetails from '../components/MovieDetails'
import Trailer from '../components/Trailer'
import Recommendations from '../components/Recommendations'
import { useAuth0 } from '@auth0/auth0-react'
import NonLoggedInMovieDetails from '../components/NonLoggedInMovieDetails'
import NonLoggedInShows from '../components/NonLoggedInShows'

function DetailsPage() {
  const { id, type } = useParams()

  const { user } = useAuth0()
  const auth0Id = user?.sub

  const {
    data: loggedin, //watchlist single item on list or not
  } = useQuery({
    queryKey: ['loggedin'],
    queryFn: checkLoggedIn,
  })
  const isLoggedIn = loggedin

  console.log('check if logged in v23132: ', isLoggedIn)

  function checkLoggedIn() {
    queryClient.invalidateQueries(['loggedin', details])
    if (auth0Id) {
      return true
    } else return false
  }

  const queryClient = useQueryClient()
  useEffect(() => {
    // Invalidate relevant queries when type or id changes
    queryClient.invalidateQueries(['details', type, id])
    queryClient.invalidateQueries(['trailer', type, id])
  }, [queryClient, type, id])

  const { data: trailer } = useQuery({
    queryKey: ['trailer', type, id],
    queryFn: () => getTrailer(type as string, Number(id)),
  })

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

  return (
    <div className="bg-black snap-proximity snap-x snap-start">
      <div>
        {/* relative min-h-screen */}
        <Trailer trailer={trailer} />
      </div>
      <div className="snap-center">
        {type == 'show' ? (
          isLoggedIn ? (
            <>
              <TvShowDetails details={details} />
              <Recommendations type={type} id={Number(id)} />
            </>
          ) : (
            <>
              <NonLoggedInShows details={details} />
              <Recommendations type={type} id={Number(id)} />
            </>
          )
        ) : isLoggedIn ? (
          <>
            <MovieDetails details={details} />
            <Recommendations type={type} id={Number(id)} />
          </>
        ) : (
          <>
            <NonLoggedInMovieDetails details={details} />
            <Recommendations type={type} id={Number(id)} />
          </>
        )}
      </div>
    </div>
  )
}

export default DetailsPage
