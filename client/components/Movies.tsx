import React from 'react'
import { Link } from 'react-router-dom'
import Posters from './Posters'
import Carousel from './Carousel'

interface Props {
  movies: any
}

function Movies(props: Props) {
  const popularMovies = props.movies.popular.results
  const upcomingMovies = props.movies.upcoming.results
  const topRatedMovies = props.movies.topRated.results

  return (
    <div>
      <div>
        <p className="text-white">Popular Movies</p>
        <Carousel contentList={popularMovies} />
        <p className="text-white">Upcoming Movies</p>
        <Carousel contentList={upcomingMovies} />
        <p className="text-white">Top Rated Movies</p>
        <Carousel contentList={topRatedMovies} />
      </div>
    </div>
  )
}

export default Movies
