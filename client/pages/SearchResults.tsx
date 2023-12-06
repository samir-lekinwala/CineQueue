import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { searchMovie } from '../api/moviesApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Posters from '../components/Posters'
import { searchShow } from '../api/showsApi'

function SearchResults() {
  const location = useLocation()
  const { search } = location

  const params = new URLSearchParams(search)
  const searchTerm = params.get('query')

  const queryClient = useQueryClient()
  useEffect(() => {
    // getSearchResults()
    // Invalidate relevant queries when type or id changes
    queryClient.invalidateQueries(['search', searchTerm])
  }, [queryClient, searchTerm])

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: getSearchResults,
  })
  if (isLoading) return <h1 className="bg-black text-white">Loading...</h1>
  if (isError) return console.error(error)

  async function getSearchResults() {
    const movies = await searchMovie(searchTerm)
    const shows = await searchShow(searchTerm)
    return { movies: movies, shows: shows }
  }

  return (
    <div className="bg-black">
      <div className="text-white">{`Results for "${searchTerm}"`}</div>
      <div className="flex flex-wrap gap-4">
        {searchResults.movies.results.map((result) => (
          <div key={result.id}>
            <Posters content={result} type={'movie'} />
          </div>
        ))}
        {searchResults.shows.results.map((result) => (
          <div key={result.id}>
            <Posters content={result} type={'show'} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
