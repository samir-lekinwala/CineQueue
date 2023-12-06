import React from 'react'
import { Link } from 'react-router-dom'
import Posters from './Posters'
import Carousel from './Carousel'

interface Props {
  movies: any
}

function Movies({ movies }: Props) {
  const popularMovies = movies.popular.results
  const upcomingMovies = movies.upcoming.results
  const topRatedMovies = movies.topRated.results
  const comedy = movies.comedy.results
  const action = movies.action.results
  const adventure = movies.adventure.results
  const animation = movies.animation.results
  const horror = movies.horror.results

  return (
    <div>
      <div>
        <p className="text-white">Popular Movies</p>
        <Carousel type={'movie'} contentList={popularMovies} />
        <p className="text-white">Upcoming Movies</p>
        <Carousel type={'movie'} contentList={upcomingMovies} />
        <p className="text-white">Top Rated Movies</p>
        <Carousel type={'movie'} contentList={topRatedMovies} />
        <p className="text-white">Comedy</p>
        <Carousel type={'movie'} contentList={comedy} />
        <p className="text-white">Action</p>
        <Carousel type={'movie'} contentList={action} />
        <p className="text-white">Horror</p>
        <Carousel type={'movie'} contentList={horror} />
        <p className="text-white">Adventure</p>
        <Carousel type={'movie'} contentList={adventure} />
        <p className="text-white">Animation</p>
        <Carousel type={'movie'} contentList={animation} />
      </div>
    </div>
  )
}

export default Movies
