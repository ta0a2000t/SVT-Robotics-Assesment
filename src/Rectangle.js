class Rectangle {
    // low is a Location, southWest corner of the Rectangle
    // high is a Location, northEast corner of the Rectangle
    constructor(low, high) {
        this.low = low;
        this.high = high;
    }

    getLow() {
        return this.low;
    }

    getHigh() {
        return this.high;
    }

    // other is a Rectangle
    isDisjointFrom(other) {
        if(other.high.getX() < this.low.getX() || other.low.getX() > this.high.getX()){
            return true;
        } else if(other.high.getY() < this.low.getY() || other.low.getY() > this.high.getY()){
            return true;
        }

		return false;
    }

    contains(other) {
        return this.getLow().getX() <= other.getLow().getX() && this.getLow().getY() <= other.getLow().getY() &&
        this.getHigh().getY() >= other.getHigh().getY() && this.getHigh().getX() >= other.getHigh().getX();
    }
}

module.exports = Rectangle;