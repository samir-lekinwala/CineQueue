import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRecomendationsById } from '../api/combinedApi'
import Posters from './Posters'
import { useEffect } from 'react'
import Carousel from './Carousel'

interface Props {
  type: string
  id: number
}

function Recommendations(props: Props) {
  const { type, id } = props

  const queryClient = useQueryClient()
  useEffect(() => {
    // Invalidate relevant queries when type or id changes
    queryClient.invalidateQueries(['details', type, id])
    queryClient.invalidateQueries(['trailer', type, id])
    queryClient.invalidateQueries(['recomendations', type, id])
  }, [queryClient, type, id])

  const {
    data: details,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['recomendations'],
    queryFn: getRecomendations,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    console.error(error)
    return null
  }

  console.log('Recomendations', details)

  async function getRecomendations() {
    const result = await getRecomendationsById(type, id)
    return result
  }

  return (
    <div>
      <div>
        <h3 className="text-white text-center font-extrabold">
          Recomendations
        </h3>
        <div className="flex gap-1 rounded">
          <Carousel contentList={details.results} />

          {/* {details.results.map((content) => (
            <Posters type={type} key={content.id} content={content} />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default Recommendations
