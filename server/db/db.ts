import connection from './connection.ts'
// import { Fruit, FruitSnakeCase, FruitData } from '../../models/fruit.ts'

interface User {
  auth_id: string
  genre: string
  time_to_watch: number
}

interface Watchlist {
  content_id: number
  auth_id: string
}

export async function upsertProfile(user: User, db = connection) {
  await db('users').insert(user).onConflict('auth_id').merge()
}

export async function getWatchlist(authId: string, db = connection) {
  await db('users').where('auth_id', authId).select()
}

export async function insertIntoWatchlistDb(
  watchlistItem: Watchlist,
  db = connection
) {
  await db('watchlist').insert(watchlistItem)
}
