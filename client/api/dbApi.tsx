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
}

export async function deleteFromWatchlist(item: WatchlistData, token: string) {
  await request
    .delete(watchlistUrl)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(item)
}

export async function getWatchlist(token: string) {
  const response = await request
    .get(watchlistUrl)
    .set('Authorization', `Bearer ${token}`)

  return response.body
}

export async function addToCompletedList(item: WatchlistData, token: string) {
  await request
    .post(`${watchlistUrl}/completed`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(item)
}

export async function getCompletedList(token: string) {
  const response = await request
    .get(`${watchlistUrl}/completed`)
    .set('Authorization', `Bearer ${token}`)

  return response.body
}

export async function deleteFromCompletedList(
  item: WatchlistData,
  token: string
) {
  await request
    .delete(`${watchlistUrl}/completed`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(item)
}
