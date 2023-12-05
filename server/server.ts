import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import cineRoutes from './routes/cineRoutes.ts'
import watchlist from './routes/watchlist.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(Path.join(__dirname, 'public')))

server.use('/api/v1/cine', cineRoutes)
server.use('/api/v1/watchlist', watchlist)

server.get('*', (req, res) => {
  res.sendFile(Path.join(__dirname, 'public/index.html'))
})

export default server
