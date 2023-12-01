import React from 'react'
import { useParams } from 'react-router-dom'

function DetailsPage() {
  const { id, type } = useParams()

  return (
    <div>
      DetailsPage
      <p>{id}</p>
      <p>{type}</p>
    </div>
  )
}

export default DetailsPage
