import React from 'react'
import { Link } from 'react-router-dom'
import Posters from './Posters'

interface Props {
  movies: any
}

function Movies(props: Props) {
  const popularMovies = props.movies.popular.results
  const upcomingMovies = props.movies.upcoming.results
  const topRatedMovies = props.movies.topRated.results

  const tmdbPosterLink = `https://image.tmdb.org/t/p/w500/`

  return (
    <div>
      <div>
        <div className="flex flex-wrap gap-4">
          {popularMovies.map((movie) => (
            <>
              <Posters
                type={'movie'}
                content={movie}
                tmdbPosterLink={tmdbPosterLink}
              />
            </>
          ))}
          <h2>Upcoming Movies</h2>
          {upcomingMovies.map((movie) => (
            <>
              <Posters
                type={'movie'}
                content={movie}
                tmdbPosterLink={tmdbPosterLink}
              />
            </>
          ))}
          {topRatedMovies.map((movie) => (
            <>
              <Posters
                type={'movie'}
                content={movie}
                tmdbPosterLink={tmdbPosterLink}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Movies
