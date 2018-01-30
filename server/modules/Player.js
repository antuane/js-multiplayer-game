'use strict';

const GameObject = require('./GameObject');

class Player extends GameObject {

    constructor (id, name, color, size, x, y) {

        super(x, y, size, size);
        this.id = id;
        this.name = name;
        this.dateLastAction = new Date().getTime();
    }

    toJSON() {
        return {
            id: this.id,
        };
    }
}

module.exports = Player;