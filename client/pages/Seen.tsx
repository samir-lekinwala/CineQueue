import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import PostersForWatchlist from '../components/PostersForWatchlist'
import { useAuth0 } from '@auth0/auth0-react'
import { getCompletedList } from '../api/dbApi'

function Seen() {
  const { user, getAccessTokenSilently } = useAuth0()
  const auth0Id = user?.sub

  const {
    data: completed,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['completedChecker'],
    queryFn: totalCompletedList,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }

  async function totalCompletedList() {
    const token = await getAccessTokenSilently()
    return await getCompletedList(token)
  }

  return (
    <div className="bg-black">
      <div>
        <h1 className="text-white">Completed</h1>
      </div>
      <div className="flex flex-wrap gap-4">
        {completed.map((item) => (
          <div key={item.content_id}>
            <PostersForWatchlist
              type={item.movie_or_show}
              id={item.content_id}
              state={'completed'}
            />
            {/* <p className="text-white">{item.content_id}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Seen
