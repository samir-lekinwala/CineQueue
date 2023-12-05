import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getWatchlist } from '../api/dbApi'
import Posters from '../components/Posters'
import PostersForWatchlist from '../components/PostersForWatchlist'

function Watchlist() {
  const { user, getAccessTokenSilently } = useAuth0()
  const auth0Id = user?.sub

  const {
    data: watchlist,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['watchlistChecker'],
    queryFn: totalWatchlist,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }

  async function totalWatchlist() {
    const token = await getAccessTokenSilently()
    return await getWatchlist(token)
  }

  return (
    <div className="bg-black">
      <div>
        <h1 className="text-white">Watchlist</h1>
      </div>
      <div className="flex flex-wrap gap-4">
        {watchlist.map((item) => (
          <div key={item.content_id}>
            <PostersForWatchlist
              type={item.movie_or_show}
              id={item.content_id}
            />
            {/* <p className="text-white">{item.content_id}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlist
