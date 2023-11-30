import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getTvShows } from '../api/showsApi'
import { getMovies } from '../api/moviesApi'

function Home() {
  const {
    data: tvShows,
    // isLoading: loading,
    // isError: Error,
  } = useQuery({
    queryKey: ['tvShows'],
    queryFn: getTvShows,
  })
  console.log('TV Shows', tvShows?.popular)
  // if (loading) return <h1>Loading...</h1>
  // if (Error) return console.error(error)

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  const popularMovies = movies.popular.results
  const upcomingMovies = movies.upcoming.results
  const topRatedMovies = movies.topRated.results

  console.log(
    'These are movies: ',
    popularMovies,
    upcomingMovies,
    topRatedMovies
  )

  return (
    <>
      <div>Home</div>
      <div className="flex flex-wrap gap-4">
        {popularMovies.map((movie) => (
          <>
            <div>
              {/* <p key={movie.id}>{movie.title}</p> */}
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
                width="200px"
              />
            </div>
          </>
        ))}

        {upcomingMovies.map((movie) => (
          <>
            <div>
              {/* <p key={movie.id}>{movie.title}</p> */}
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
                width="200px"
              />
            </div>
          </>
        ))}
        {topRatedMovies.map((movie) => (
          <>
            <div>
              {/* <p key={movie.id}>{movie.title}</p> */}
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
                width="200px"
              />
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default Home
