'use strict';

class GameObject {

    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    testCollision(obj) {
        return ! (
            (this.y + this.height <= obj.y) ||
            (this.y >= obj.y + obj.height) ||
            (this.x >= obj.x + obj.width) ||
            (this.x + this.width <= obj.x)
        );
    };
}

module.exports = GameObject;