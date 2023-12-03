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
        <Carousel contentList={popularMovies} />
        <Carousel contentList={upcomingMovies} />
        <Carousel contentList={topRatedMovies} />
      </div>
    </div>
  )
}

export default Movies
