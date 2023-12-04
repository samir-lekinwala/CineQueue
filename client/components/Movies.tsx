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
  const comedy = props.movies.comedy.results
  const action = props.movies.action.results
  const adventure = props.movies.adventure.results
  const animation = props.movies.animation.results
  const horror = props.movies.horror.results

  return (
    <div>
      <div>
        <p className="text-white">Popular Movies</p>
        <Carousel contentList={popularMovies} />
        <p className="text-white">Upcoming Movies</p>
        <Carousel contentList={upcomingMovies} />
        <p className="text-white">Top Rated Movies</p>
        <Carousel contentList={topRatedMovies} />
        <p className="text-white">Comedy</p>
        <Carousel contentList={comedy} />
        <p className="text-white">Action</p>
        <Carousel contentList={action} />
        <p className="text-white">Horror</p>
        <Carousel contentList={horror} />
        <p className="text-white">Adventure</p>
        <Carousel contentList={adventure} />
        <p className="text-white">Animation</p>
        <Carousel contentList={animation} />
      </div>
    </div>
  )
}

export default Movies
