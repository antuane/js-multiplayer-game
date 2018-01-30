'use strict';

const GameObject = require('./GameObject');

class Player extends GameObject {

    constructor (id, name, color, size, x, y) {

        super(x, y, size, size);
        this.id = id;
        this.name = name;
        this.color = color;
        this.dateLastAction = new Date().getTime();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            velocity: this.velocity,
            live: this.live,
            dateUpdateAction: this.dateUpdateAction,
            dateUpdateShot: this.dateUpdateShot,
        };
    }
}

module.exports = Player;