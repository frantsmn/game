import {reactive} from 'vue'
import {io} from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

export const state = reactive({
    connected: false,
    // moveEvents: [],
})
export const socket = io(URL)

socket.on('connect', () => {
    state.connected = true
    state.playersAmount = state.playersAmount + 1
    console.info('[socket] ✅ Connected')
})

socket.on('disconnect', () => {
    state.connected = false
    state.playersAmount = state.playersAmount - 1
    console.info('[socket] ❌ Disconnected')
})

socket.on('stateUpdate', ({playersAmount}) => {
    state.playersAmount = playersAmount
})

// socket.on('move', (...args) => {
//     state.moveEvents.push(args)
// })
