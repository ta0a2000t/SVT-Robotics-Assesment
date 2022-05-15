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
        if(other.high.getX() < low.getX() || other.low.getX() > high.getX()){
            return true;
        } else if(other.high.getY() < low.getY() || other.low.getY() > high.getY()){
            return true;
        }

		return false;
    }
}

module.exports = Rectangle;