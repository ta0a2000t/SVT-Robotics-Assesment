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
}

module.exports = Location;