import React from 'react'
import Posters from './Posters'
import Carousel from './Carousel'

interface Props {
  shows: any
}

function TvShows(props: Props) {
  const popularShows = props.shows.popular.results
  const trendingShows = props.shows.trending.results
  const topRatedShows = props.shows.topRated.results

  return (
    <div>
      <div>
        <p className="text-white">Top Rated Shows</p>
        <Carousel contentList={topRatedShows} />
        <p className="text-white">Popular Shows</p>
        <Carousel contentList={popularShows} />
        <p className="text-white">Trending Shows</p>
        <Carousel contentList={trendingShows} />
      </div>
    </div>
  )
}

export default TvShows
