import React from 'react'
import { useParams } from 'react-router-dom'

function DetailsPage() {
  const { id, type } = useParams()

  return <div>DetailsPage</div>
}

export default DetailsPage
