import request from 'superagent'
import { WatchlistData } from '../models/models'

const watchlistUrl = '/api/v1/watchlist'

// export async function addToWatchlist(item: WatchlistData) {
//   return request.post(`${watchlistUrl}`).send(item)
// }
// export async function getWatchlist(item: Item) {
//   const response = await request.get(`${watchlistUrl}`)
//   return response.body
// }

export async function addToWatchlist(item: WatchlistData, token: string) {
  await request
    .post(watchlistUrl)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(item)
  console.log('api working?', item, token)
}

export async function getWatchlist(token: string) {
  const response = await request
    .get(watchlistUrl)
    .set('Authorization', `Bearer ${token}`)

  return response.body
}
