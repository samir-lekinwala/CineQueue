import express from 'express'
// import { FruitData } from '../../models/fruit.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/db.ts'

const router = express.Router()

//route is /api/v1/watchlist

//todo - post item to watchlist
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userData = req.body

    const auth0Id = req.auth?.sub
    const watchlist = {
      auth_id: auth0Id,
      ...userData,
    }

    await db.insertIntoWatchlistDb(watchlist)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
})

//todo - adjust function to get status of items on watchlist
router.get('/', async (req, res) => {
  try {
    // const userData = req.body

    const auth0Id = '2'
    const user = {
      auth_id: auth0Id,
      // ...userData,
    }

    await db.getWatchlist(auth0Id)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
})

export default router
