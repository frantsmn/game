import Phaser from 'phaser'
import {useExampleScene} from './example-scene.js'
import {socket} from '@/modules/socket/index.js'
import {state} from '@/modules/socket/index.js'

export const runGame = () => {
    const config = {
        type: Phaser.AUTO,
        parent: 'canvas',
        width: 1280,
        height: 640,
        scene: useExampleScene(socket, state.players),
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
    }

    return new Phaser.Game(config)
}
