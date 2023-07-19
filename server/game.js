import {Player} from './models/index.js'
import {players} from './store/index.js'

const state = {
    players,
}

export const game = (io) => {
    io.on('connection', (socket) => {
        console.log(`[io] ${socket.id} connected`)

        const player = new Player(socket.id)

        state.players.push(player)
        io.emit('stateUpdate', state)

        socket.on('updateName', (name) => {
            player.updateName(name)
            io.emit('stateUpdate', state)
        })

        // Рисует на клиенте -> Оповещает сервер -> Рисует на ОСТАЛЬНЫХ клиентах от сервера
        socket.on('addPoint', ({x, y}) => {
            socket.broadcast.emit('addPoint', {x, y})
        })

        // Оповещает сервер -> Сервер шлет всем клиентам -> Рисует на ВСЕХ клиентах от сервера
        socket.on('key', ({type, key}) => {
            // console.log('key', {uid: socket.id, type, key})
            io.emit('key', {uid: socket.id, type, key})
        })

        socket.on('syncPosition', ({x, y}) => {
            // Синкаем ТОЛЬКО позиции противников
            // Свою перезаписывать по ответу от сервера не стоит, т.к. будет лаг
            socket.broadcast.emit('syncPosition', {uid: socket.id, x, y})
        })

        socket.on('disconnect', () => {
            io.emit('playerDisconnected', socket.id)
            state.players = state.players.filter(player => player.uid !== socket.id)
            io.emit('stateUpdate', state)
            console.log(`[io] ${socket.id} disconnected`)
        })
    })
}
