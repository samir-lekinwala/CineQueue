import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTvShows } from '../api/showsApi'
import { getMovies } from '../api/moviesApi'
import Movies from '../components/Movies'
import TvShows from '../components/TvShows'

function Home() {
  //enterTainmentType means the type of content, either tv show or movies. True means movies, false means tv shows
  const [entertainmentType, setEntertainmentType] = useState(true)
  const {
    data: tvShows,
    // isLoading: loading,
    // isError: Error,
  } = useQuery({
    queryKey: ['tvShows'],
    queryFn: getTvShows,
  })
  console.log('TV Shows', tvShows?.trending)
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

  function onButtonClick() {
    setEntertainmentType(!entertainmentType)
  }

  return (
    <>
      <div>Home</div>

      {entertainmentType ? (
        <>
          <button onClick={() => onButtonClick()}>TV Shows</button>
          <Movies movies={movies} entertainmentButton={onButtonClick} />
        </>
      ) : (
        <div>
          <button onClick={() => onButtonClick()}>Movies</button>
          <TvShows shows={tvShows} />
          {/* <h2>TV Shows</h2> */}
        </div>
      )}
      {/* <h2>Popular Movies</h2> */}
    </>
  )
}

export default Home
