import express from 'express'
// import { FruitData } from '../../models/fruit.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/db.ts'
import { WatchlistData } from '../../client/models/models.ts'

const router = express.Router()

//route is /api/v1/watchlist/completed

//for completed
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    // const userData = req.body

    const auth0Id = req.auth?.sub
    // const user = {
    //   auth_id: auth0Id,
    //   // ...userData,
    // }

    const result = await db.getCompletedlist(auth0Id)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
})

//for completed
router.delete('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userData = req.body
    const auth0Id = req.auth?.sub
    const watchlist = {
      auth_id: auth0Id,
      ...userData,
    } as WatchlistData
    console.log('from server side: ', watchlist)

    await db.deleteFromCompletedList(watchlist)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
})

//For completed list
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userData = req.body
    const auth0Id = req.auth?.sub
    const watchlist = {
      auth_id: auth0Id,
      ...userData,
    } as WatchlistData

    await db.addToCompleted(watchlist)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
})

export default router
