import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import {
  deleteFromWatchlist,
  getWatchlist,
  insertIntoWatchlistDb,
} from '../db/db'

import dotenv from 'dotenv'
import { getMockToken } from './mockToken'

dotenv.config()

vi.mock('../db/db.ts')

//*POST* ROUTE FOR WATCHLIST//

describe('POST /api/v1/watchlist', () => {
  it('Should return status 201 when adding new user to the db', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(insertIntoWatchlistDb).mockResolvedValue()
    const response = await request(server)
      .post('/api/v1/watchlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(201)
  })
})

describe('POST /api/v1/watchlist', () => {
  it('Should return an error message and send an error status', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(insertIntoWatchlistDb).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/watchlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(500)
  })
})

describe('POST /api/v1/watchlist', () => {
  it('should return status 401 for forbiden access ', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(insertIntoWatchlistDb).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/watchlist')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})

//!! *DELETE* ROUTE FOR WATCHLIST !!//

describe('DELETE /api/v1/watchlist', () => {
  it('Should return status 200 when content deleted from db', async () => {
    const userData = {
      auth_id: '2',
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(deleteFromWatchlist).mockResolvedValue(2)
    const response = await request(server)
      .delete('/api/v1/watchlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(200)
  })
})

describe('DELETE /api/v1/watchlist', () => {
  it('Should return an error message and send an error status', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(deleteFromWatchlist).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .delete('/api/v1/watchlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(500)
  })
})

describe('DELETE /api/v1/watchlist', () => {
  it('should return status 401 for forbiden access ', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(deleteFromWatchlist).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .delete('/api/v1/watchlist')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})

//!! *GET* ROUTE FOR WATCHLIST !!//

describe('GET /api/v1/watchlist', () => {
  it('Should return status 200 when content deleted from db', async () => {
    const userData = [
      {
        auth_id: '2',
        content_id: 2,
        movie_or_show: 'far out',
      },
    ]

    vi.mocked(getWatchlist).mockResolvedValue(userData)
    const response = await request(server)
      .get('/api/v1/watchlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(200)
  })
})

describe('GET /api/v1/watchlist', () => {
  it('Should return an error message and send an error status', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(getWatchlist).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/watchlist')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(500)
  })
})

describe('GET /api/v1/watchlist', () => {
  it('should return status 401 for forbiden access ', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(getWatchlist).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/watchlist')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})
