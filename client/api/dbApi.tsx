import request from 'superagent'

const watchlistUrl = '/api/v1/watchlist'

interface Item {
  id: number
  type: string
}

export async function addToWatchlist(item: Item) {
  return request.post(`${watchlistUrl}`).send(item)
}
export async function getWatchlist(item: Item) {
  const response = await request.get(`${watchlistUrl}`)
  return response.body
}
