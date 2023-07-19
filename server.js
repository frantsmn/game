import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import {game} from './server/game.js'

const app = express()
app.use(express.static('dist'))

const server = http
  .createServer(app)
  .listen(3000, () => {
      console.log('listening on :3000')
  })

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

game(io)
