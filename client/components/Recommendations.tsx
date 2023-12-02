import { useQuery } from '@tanstack/react-query'
import { getRecomendationsById } from '../api/combinedApi'
import Posters from './Posters'

interface Props {
  type: string
  id: number
}

function Recommendations(props: Props) {
  const { type, id } = props

  const {
    data: details,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recomendations'],
    queryFn: getRecomendations,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  console.log('Recomendations', details)

  async function getRecomendations() {
    const result = await getRecomendationsById(type, id)
    return result
  }

  return (
    <div>
      <div>
        <h3 className="text-white">Recomendations</h3>
        <div className="flex">
          {details.results.map((content) => (
            <Posters type={type} key={content.id} content={content} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recommendations
