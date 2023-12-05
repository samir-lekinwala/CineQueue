import { WatchlistData } from '../../client/models/models.ts'
import connection from './connection.ts'
// import { Fruit, FruitSnakeCase, FruitData } from '../../models/fruit.ts'

interface User {
  auth_id: string
  genre: string
  time_to_watch: number
}

export async function insertIntoWatchlistDb(
  watchlistItem: WatchlistData,
  db = connection
) {
  await db('watchlist').insert(watchlistItem)
}

export async function upsertProfile(user: User, db = connection) {
  await db('users').insert(user).onConflict('auth_id').merge()
}

export async function getWatchlist(authId: string, db = connection) {
  return await db('watchlist').where('auth_id', authId).select()
}
