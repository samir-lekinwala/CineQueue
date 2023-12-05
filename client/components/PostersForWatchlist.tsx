import { NavHashLink } from 'react-router-hash-link'
import { getDetailById } from '../api/combinedApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { deleteFromWatchlist } from '../api/dbApi'

function PostersForWatchlist(props: Props) {
  const { type, id } = props

  const { user, getAccessTokenSilently } = useAuth0()
  const auth0Id = user?.sub
  const tmdbPosterLink = `https://image.tmdb.org/t/p/w500/`

  console.log(id, type)
  const queryClient = useQueryClient()
  queryClient.invalidateQueries(['watchlistContent', id])
  useEffect(() => {
    // Invalidate relevant queries when type or id changes

    queryClient.invalidateQueries(['watchlistContent', id])
  }, [queryClient, id])

  async function getContentDetails() {
    const result = await getDetailById(type, id)
    console.log('result v2', result)
    return result
  }

  const {
    data: content,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['watchlistContent', 'watchlistChecker', id],
    queryFn: getContentDetails,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }
  console.log('Content', content)

  function getReleaseYear() {
    if (content.release_date) {
      const result = content.release_date.split('-')[0]

      return result
    } else if (content.first_air_date) {
      const result = content.first_air_date.split('-')[0]

      return result
    } else return 'Release date unknown'
  }

  const toWatchList = {
    content_id: content.id,
    movie_or_show: type,
    auth_id: auth0Id,
  }

  async function handleWatchListClickDelete() {
    const token = await getAccessTokenSilently()
    await deleteFromWatchlist(toWatchList, token)
    // console.log(toWatchList)
    queryClient.invalidateQueries(['watchlistChecker'])
  }

  return (
    <div>
      <NavHashLink to={`/details/${type}/${content.id}#trailer`}>
        {!content.poster_path || content.poster_path == 'null' ? (
          <>
            <div className="relative">
              <img
                alt={content.title ? `${content.title}` : `${content.name}`}
                src="/client/images/blank-poster.jpg"
                className="w-52"
              ></img>
              <div className="text-white absolute top-1/4">
                <p>{content.title ? `${content.title}` : `${content.name}`}</p>
                <p>{`${getReleaseYear()}`}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap">
              <img
                src={`${tmdbPosterLink}${content.poster_path}`}
                alt=""
                className="w-52 rounded"
              />
            </div>
          </>
        )}
      </NavHashLink>
      <button
        onClick={handleWatchListClickDelete}
        className="text-[#be123c] text-center"
      >
        X
      </button>
      {/* <p>{`ID: ${content.id}`}</p> */}
    </div>
  )
}

export default PostersForWatchlist
