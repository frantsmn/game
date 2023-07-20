import Phaser from 'phaser'
import {useKeyboard} from '@/components/canvas/keyboard.js'

export const useExampleScene = (socket) => {
    return class Example extends Phaser.Scene {
        text
        players = {}
        names = {}
        keyboards = {}

        preload() {
            this.load.spritesheet('spacecraft1', '/sprites/spacecraft-48-1.png', {frameWidth: 48, frameHeight: 48})
            this.load.spritesheet('spacecraft2', '/sprites/spacecraft-48-2.png', {frameWidth: 48, frameHeight: 48})
            this.load.spritesheet('balls', '/sprites/balls.png', {frameWidth: 24, frameHeight: 24})
            this.load.spritesheet('smile', '/sprites/smile.png', {frameWidth: 24, frameHeight: 24})
        }

        create() {
            this.text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#00ff00'})
            // this.cursors = this.input.keyboard.createCursorKeys()

            // 👾 Manage Players

            socket.on('stateUpdate', ({players}) => {
                players.forEach((player) => {
                    this.names[player.uid]?.setText(player.name)
                    if (this.players[player.uid]) {
                        return
                    }
                    // todo: подставлять кооры игрока
                    this.players[player.uid] = this.physics.add.image(0, 0, socket.id === player.uid ? 'spacecraft1' : 'spacecraft2')
                    if (socket.id !== player.uid) {
                        this.names[player.uid] = this.add.text(0, 45, player.name, {
                            font: '14px Courier',
                            fill: '#ff0000'
                        })
                        // this.players[player.uid].physics.world.add(name)
                    }
                    this.players[player.uid].setCollideWorldBounds(true)
                    if (!this.keyboards[player.uid]) {
                        const isEmit = socket.id === player.uid
                        this.keyboards[player.uid] = useKeyboard(socket, player.uid, isEmit)
                    }
                })
            })

            socket.on('playerDisconnected', (uid) => {
                this.players[uid]?.destroy()
                delete this.players[uid]
                delete this.names[uid]?.destroy()
                // todo: this.keyboards[uid]?.destroy()
                delete this.keyboards[uid]
            })

            // ⚡ Sync Position

            setInterval(() => {
                if (!this.players[socket.id]) {
                    return
                }
                const {x, y} = this.players[socket.id]
                socket.emit('syncPosition', {x, y})
            }, 300)

            socket.on('syncPosition', ({uid, x, y}) => {
                console.log(`⚡Sync ${uid} position!`)
                this.players[uid].x = x
                this.players[uid].y = y
            })

            // 👆 Manage Pointer Click

            this.input.on('pointerdown', function (pointer) {
                // console.log(this.game.loop.frame, 'down B')
                this.add.image(pointer.x, pointer.y, 'smile', 0)
                socket.emit('addPoint', {x: pointer.x, y: pointer.y})
            }, this)

            socket.on('addPoint', ({x, y}) => this.add.image(x, y, 'balls', 0))
        }

        update() {
            for (const uid in this.players) {
                this.players[uid].setVelocity(0)

                if (this.keyboards[uid].ArrowLeft) {
                    this.players[uid].setVelocityX(-500)
                }
                if (this.keyboards[uid].ArrowRight) {
                    this.players[uid].setVelocityX(500)
                }
                if (this.keyboards[uid].ArrowUp) {
                    this.players[uid].setVelocityY(-500)
                }
                if (this.keyboards[uid].ArrowDown) {
                    this.players[uid].setVelocityY(500)
                }

                if (this.names[uid]) {
                    this.names[uid].x = this.players[uid].x - 20
                    this.names[uid].y = this.players[uid].y + 40
                }
            }

            const p = this.input.activePointer

            this.text.setText([
                `x: ${p.x}`,
                `y: ${p.y}`,
                `duration: ${p.getDuration()}`
            ])
        }
    }
}
