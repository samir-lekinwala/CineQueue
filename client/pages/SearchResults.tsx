import React from 'react'
import { useLocation } from 'react-router-dom'
import { searchMovie } from '../api/moviesApi'
import { useQuery } from '@tanstack/react-query'
import Posters from '../components/Posters'
import { searchShow } from '../api/showsApi'

function SearchResults() {
  const location = useLocation()
  const { search } = location

  const params = new URLSearchParams(search)
  const searchTerm = params.get('query')

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['search'],
    queryFn: getSearchResults,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  async function getSearchResults() {
    const movies = await searchMovie(searchTerm)
    const shows = await searchShow(searchTerm)
    return { movies: movies, shows: shows }
  }

  console.log(searchResults)
  return (
    <>
      <div>{`Results for ${searchTerm}`}</div>
      <div className="flex flex-wrap gap-4">
        {searchResults.movies.results.map((result) => (
          <Posters key={result.id} content={result} type={'movie'} />
        ))}
        {searchResults.shows.results.map((result) => (
          <Posters key={result.id} content={result} type={'show'} />
        ))}
      </div>
    </>
  )
}

export default SearchResults
