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

export async function deleteFromWatchlist(
  watchlistItem: WatchlistData,
  db = connection
) {
  return await db('watchlist')
    .where('auth_id', watchlistItem.auth_id)
    .where('content_id', watchlistItem.content_id)
    .del()
}

export async function upsertProfile(user: User, db = connection) {
  await db('users').insert(user).onConflict('auth_id').merge()
}

export async function getWatchlist(authId: string, db = connection) {
  return await db('watchlist').where('auth_id', authId).select()
}
export async function getCompletedlist(authId: string, db = connection) {
  return await db('seen').where('auth_id', authId).select()
}

export async function deleteFromCompletedList(
  watchlistItem: WatchlistData,
  db = connection
) {
  return await db('seen')
    .where('auth_id', watchlistItem.auth_id)
    .where('content_id', watchlistItem.content_id)
    .del()
}

export async function addToCompleted(
  watchlistItem: WatchlistData,
  db = connection
) {
  await db('seen').insert(watchlistItem)
}
