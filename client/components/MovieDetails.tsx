import React from 'react'

function MovieDetails(props: Props) {
  return (
    <div>
      <h1>{props.details.original_title}</h1>
    </div>
  )
}

export default MovieDetails
