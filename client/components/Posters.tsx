import React from 'react'
import { Link } from 'react-router-dom'

function Posters(props: Props) {
  const { type, content, tmdbPosterLink } = props

  return (
    <div>
      <Link to={`/details/${type}/${content.id}`}>
        <img
          src={`${tmdbPosterLink}${content.poster_path}`}
          alt=""
          width="200px"
        />
      </Link>
      <p>{`ID: ${content.id}`}</p>
    </div>
  )
}

export default Posters
