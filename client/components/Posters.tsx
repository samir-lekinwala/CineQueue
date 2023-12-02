import React from 'react'
import { Link } from 'react-router-dom'
// import { HashLink as Link } from 'react-router-hash-link'

function Posters(props: Props) {
  const { type, content, tmdbPosterLink } = props

  return (
    <div>
      <Link to={`/details/${type}/${content.id}`}>
        <img
          src={`${tmdbPosterLink}${content.poster_path}`}
          alt=""
          width="200px"
          className="rounded"
        />
      </Link>
      <p>{`ID: ${content.id}`}</p>
    </div>
  )
}

export default Posters
