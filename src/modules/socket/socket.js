import {reactive} from 'vue'
import {io} from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

export const state = reactive({
    uid: undefined,
    connected: false,

    players: [],
    // moveEvents: [],
})

export const socket = io(URL)

socket.on('connect', () => {
    state.uid = socket?.id ?? undefined
    state.connected = true

    console.info('[socket] ✅ Connected')
})

socket.on('disconnect', () => {
    state.connected = false
    state.players = state.players.filter(player => player.uid !== state.uid)

    console.info('[socket] ❌ Disconnected')
})

socket.on('stateUpdate', ({players}) => {
    state.players = players || []

    console.info('[socket] ⬆️ stateUpdate', players)
})

// socket.on('move', (...args) => {
//     state.moveEvents.push(args)
// })
