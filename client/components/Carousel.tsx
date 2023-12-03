import React from 'react'
import Posters from './Posters'

function Carousel(props: Props) {
  const tmdbPosterLink = `https://image.tmdb.org/t/p/w500/`

  return (
    <div className="carousel-container relative overflow-hidden">
      <div className="carousel-wrapper flex">
        {/* <div className="flex justify-center">
      <div className="flex flex-wrap gap-4"> */}
        {props.contentList.map((movie, index) => (
          <div key={movie.id} className="poster flex-none">
            <Posters
              type={`movie`}
              content={movie}
              tmdbPosterLink={tmdbPosterLink}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
