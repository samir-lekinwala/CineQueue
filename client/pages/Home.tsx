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

  function onButtonClick() {
    setEntertainmentType(!entertainmentType)
  }

  return (
    <div className="bg-black">
      <div>Home</div>

      {entertainmentType ? (
        <>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => onButtonClick()}
          >
            TV Shows
          </button>
          <Movies movies={movies} />
        </>
      ) : (
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => onButtonClick()}
          >
            Movies
          </button>
          <TvShows shows={tvShows} />
        </div>
      )}
    </div>
  )
}

export default Home
