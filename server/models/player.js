export class Player {
    constructor(uid) {
        this.uid = uid
        this.name = `Player ${uid}`
    }

    updateName(name) {
        this.name = name
    }
}
