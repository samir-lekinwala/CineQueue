import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import {
  deleteFromCompletedList,
  addToCompleted,
  getCompletedlist,
} from '../db/db'

import dotenv from 'dotenv'
import { getMockToken } from './mockToken'

dotenv.config()

vi.mock('../db/db.ts')

//!! *DELETE* ROUTE FOR WATCHLIST !!//

describe('Delete/api/v1/completed', () => {
  it('Should return status 201 when adding content to the db', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(deleteFromCompletedList).mockResolvedValue(2)
    const response = await request(server)
      .delete('/api/v1/watchlist/completed')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(200)
  })
})

describe('DELETE /api/v1/watchlist/completed', () => {
  it('Should return an error message and send an error status', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(deleteFromCompletedList).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .delete('/api/v1/watchlist/completed')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(500)
  })
})

describe('DELETE /api/v1/watchlist/completed', () => {
  it('should return status 401 for forbiden access ', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(deleteFromCompletedList).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .delete('/api/v1/watchlist/completed')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})

//*POST* ROUTE FOR COMPLETED//

describe('POST /api/v1/watchlist/completed', () => {
  it('Should return status 201 when adding new user to the db', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(addToCompleted).mockResolvedValue()
    const response = await request(server)
      .post('/api/v1/watchlist/completed')
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

    vi.mocked(addToCompleted).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/watchlist/completed')
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

    vi.mocked(addToCompleted).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/watchlist/completed')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})

// //!! *GET* ROUTE FOR WATCHLIST !!//

describe('GET /api/v1/watchlist/completed', () => {
  it('Should return status 200 when content deleted from db', async () => {
    const userData = [
      {
        auth_id: '2',
        content_id: 2,
        movie_or_show: 'far out',
      },
    ]

    vi.mocked(getCompletedlist).mockResolvedValue(userData)
    const response = await request(server)
      .get('/api/v1/watchlist/completed')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(200)
  })
})

describe('GET /api/v1/watchlist/completed', () => {
  it('Should return an error message and send an error status', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(getCompletedlist).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/watchlist/completed')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(500)
  })
})

describe('GET /api/v1/watchlist/completed', () => {
  it('should return status 401 for forbiden access ', async () => {
    const userData = {
      auth_id: 2,
      content_id: 2,
      movie_or_show: 'far out',
    }

    vi.mocked(getCompletedlist).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/watchlist/completed')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})
