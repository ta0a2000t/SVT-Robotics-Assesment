const Rectangle = require('./Rectangle');

class Location{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getY() {
        return this.y;
    }

    getX() {
        return this.x;
    }

    // either 0 for x, or 1 for y
    get(cutDim) {
        if(cutDim == 0) {
            return this.x;
        } else {
            return this.y;
        }
    }

    getDistanceFrom(other) {
        return Math.sqrt(Math.pow(this.x - other.getX(), 2) + Math.pow(this.y - other.getY(), 2))
    }
    // rectangle: Rectangle
    // returns true if the location is inside the rectangle
    isInside(rectangle) {
        let xIsInside = this.x <= rectangle.getHigh().getX() && this.x >= rectangle.getLow().getX();
        let yIsInside = this.y <= rectangle.getHigh().getY() && this.y >= rectangle.getLow().getY();
        return xIsInside && yIsInside;
    }
}

module.exports = Location;