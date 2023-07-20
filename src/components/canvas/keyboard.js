export const useKeyboard = (socket, id) => {
    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
    }

    const handler = (e) => {
        if (socket.id !== id) {
            return
        }

        socket.emit('key', {type: e.type, key: e.key})

        let text = e.type +
          ' key=' + e.key +
          ' code=' + e.code +
          (e.shiftKey ? ' shiftKey' : '') +
          (e.ctrlKey ? ' ctrlKey' : '') +
          (e.altKey ? ' altKey' : '') +
          (e.metaKey ? ' metaKey' : '') +
          (e.repeat ? ' (repeat)' : '') +
          '\n'

        // console.info(text)
    }

    socket.on('key', ({uid, type, key}) => {
        if (uid !== id) {
            return
        }
        switch (key) {
            case 'ArrowUp':
                keys.ArrowUp = type === 'keydown'
                break
            case 'ArrowDown':
                keys.ArrowDown = type === 'keydown'
                break
            case 'ArrowLeft':
                keys.ArrowLeft = type === 'keydown'
                break
            case 'ArrowRight':
                keys.ArrowRight = type === 'keydown'
                break
            default:
                break
        }
    })

    document.onkeydown = document.onkeyup = handler
    // element.tabIndex = 1000
    // element.addEventListener('onkeydown', handler)
    // element.addEventListener('onkeyup', handler)

    return keys
}
