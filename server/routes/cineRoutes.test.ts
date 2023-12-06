import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import {
  //   deleteFromWatchlist,
  //   getWatchlist,
  //   insertIntoWatchlistDb,
  upsertProfile,
} from '../db/db'

import dotenv from 'dotenv'
import { getMockToken } from './mockToken'

dotenv.config()

vi.mock('../db/db.ts')

describe('POST /api/v1/cine', () => {
  it('Should return status 201 when adding new user to the db', async () => {
    const userData = {
      auth_id: '2',
      genre: 'action',
      time_to_watch: 200,
    }

    vi.mocked(upsertProfile).mockResolvedValue()
    const response = await request(server)
      .post('/api/v1/cine')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(201)
  })
})

describe('POST /api/v1/cine', () => {
  it('Should return an error message and send an error status', async () => {
    const userData = {
      auth_id: 2,
      genre: 2,
      time_to_watch: 'far out',
    }

    vi.mocked(upsertProfile).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/cine')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(userData)
    expect(response.status).toBe(500)
  })
})

describe('POST /api/v1/cine', () => {
  it('should return status 401 for forbiden access ', async () => {
    const userData = {
      auth_id: 2,
      genre: 2,
      time_to_watch: 'far out',
    }

    vi.mocked(upsertProfile).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/cine')
      .set('authorization', `Bearer jonas`)
      .send(userData)
    expect(response.status).toBe(401)
  })
})
