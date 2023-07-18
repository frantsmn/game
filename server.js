import http from 'http'
import express from 'express'
import {Server} from 'socket.io'

const app = express()
app.use(express.static('dist'))

const server = http.createServer(app)
server.listen(3000, () => {
    console.log('listening on :3000')
})

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

class Player {
    constructor(uid) {
        this.uid = uid
        this.name = `Player ${uid}`
    }

    updateName(name) {
        this.name = name
    }
}

const state = {
    players: []
}

io.on('connection', (socket) => {
    console.log(`[io] ${socket.id} connected`)

    const player = new Player(socket.id)

    state.players.push(player)
    io.emit('stateUpdate', state)


    socket.on('updateName', (name) => {
        player.updateName(name)
        io.emit('stateUpdate', state)
    })

    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg)
    // })

    socket.on('disconnect', () => {
        state.players = state.players.filter(player => player.uid !== socket.id)
        io.emit('stateUpdate', state)
        console.log(`[io] ${socket.id} disconnected`)
    })
})
