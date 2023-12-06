import { it, beforeAll, beforeEach, describe, expect } from 'vitest'
import db from './connection'
import {
  addToCompleted,
  deleteFromCompletedList,
  deleteFromWatchlist,
  getWatchlist,
  insertIntoWatchlistDb,
  upsertProfile,
} from './db'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getWatchlist', () => {
  it('Should return content in the watchlist table', async () => {
    const user = await getWatchlist('2')
    expect(user).toHaveLength(4)
    expect(user[0]).toHaveProperty('movie_or_show')
    expect(user[0]).toHaveProperty('content_id')
    expect(user[0]).toHaveProperty('id')
  })
})

describe('upsertProfile', () => {
  it('Should add new users data to users table', async () => {
    const user_data = {
      auth_id: '7',
      genre: 'action',
      time_to_watch: 20,
    }
    await upsertProfile(user_data)
    const users = await db('users').select()
    expect(users).toContainEqual(user_data)
  })
})

describe('Delete from watchlist', () => {
  it('Should delete content from Watchlist', async () => {
    const watchlistItem = {
      content_id: 12,
      movie_or_show: 'movie',
      auth_id: '12',
    }

    await deleteFromWatchlist(watchlistItem)

    const watchlist = await db('watchlist').select()
    expect(watchlist).not.toContain(watchlistItem)
  })
})

describe('Add to watchlist', () => {
  it('Should insert content to Watchlist table', async () => {
    const watchlistItem = {
      content_id: 50,
      movie_or_show: 'movie',
      auth_id: '212',
    }

    await insertIntoWatchlistDb(watchlistItem)

    const watchlist = await db('watchlist')
      .where('auth_id', watchlistItem.auth_id)
      .select('content_id', 'movie_or_show', 'auth_id')
      .first()

    expect(watchlist).toContain(watchlist)
  })
})

describe('getCompletedlist', () => {
  it('should return content in the completed table', async () => {
    const user = await getWatchlist('2')
    expect(user).toHaveLength(4)
    expect(user[0]).toHaveProperty('movie_or_show')
    expect(user[0]).toHaveProperty('content_id')
    expect(user[0]).toHaveProperty('id')
  })
})
describe('deleteFromCompletedList', () => {
  it('should delete content from the completed table', async () => {
    const listItem = {
      content_id: 12,
      movie_or_show: 'movie',
      auth_id: '12',
    }
    await deleteFromCompletedList(listItem)

    const watchlist = await db('watchlist').select()
    expect(watchlist).not.toContain(listItem)
  })
})
describe('addToCompleted', () => {
  it('should add a content to completed table', async () => {
    const listItem = {
      content_id: 12,
      movie_or_show: 'movie',
      auth_id: '12',
    }
    await addToCompleted(listItem)
    const watchlist = await db('seen')
      .where('auth_id', listItem.auth_id)
      .select('content_id', 'movie_or_show', 'auth_id')
      .first()

    expect(watchlist).toContain(watchlist)
  })
})
