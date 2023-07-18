import http from 'http'
import express from 'express'
import {Server} from 'socket.io'

const app = express()
app.use(express.static('dist'))

const server = http.createServer(app)
server.listen(3000, () => {
    console.log('listening on *:3000')
})

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

const state = {
    playersAmount: 0
}

io.on('connection', (socket) => {
    console.log('a user connected')
    state.playersAmount++
    io.emit('stateUpdate', state)

    socket.on('disconnect', () => {
        console.log('user disconnected')
        state.playersAmount--
        io.emit('stateUpdate', state)
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
    })
})
