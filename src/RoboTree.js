const RoboNode = require('./RoboNode');
const Location = require('./Location');
const Rectangle = require('./Rectangle');
const UtilityFunctions = require('./UtilityFunctions');

class RoboTree {    
    // boundingBox is a Rectangle
    constructor(boundingBox) {
        this.root = undefined;
        this.bbx = boundingBox;
    }

    // assumes robot is not undefined
    insert(robot) {

        if(this.root == undefined) {
            let cutDim = UtilityFunctions.calcCutDim(this.bbx);
            let newNode = new RoboNode(robot, new Location(robot.x, robot.y), cutDim);
            this.root = newNode;

        } else {
            if(this.root.isInputLeftSide(new Location(robot.x, robot.y))) { // if at left or down side
                return this.root.insert(robot, this.root.getLeftCell(this.bbx));
            } else {
                return this.root.insert(robot, this.root.getRightCell(this.bbx));
            }
        }
    }

    // loadLocation is a Location
    // validRadius is an int, the maximum distance from the load to a robot
    // withinRange: array of robots
    getBestRobot(loadLocation, validRadius) {
        let rangeLower = new Location(loadLocation.x - validRadius, loadLocation.y - validRadius);
        let rangeHigher = new Location(loadLocation.x + validRadius, loadLocation.y + validRadius);
        let range = new Rectangle(rangeLower, rangeHigher);
        let withinRange = new Array(0);

        // fill up withinRange with robots
        this.findWithinRangeRobots(range, this.root, this.bbx, withinRange);

        return UtilityFunctions.bestRobot(withinRange, validRadius, loadLocation);
    }
    
    // recursive, fills up withinRange array with potential robots (inside our square range)
    // Note: the range is a square, so we do not want those away from the radius(on edges of the square).
    // range: Rectangle
    // curr: RoboNode
    // cell: Rectangle
    // withinRange: array of robots
    // void
    findWithinRangeRobots(range, curr, cell, withinRange) {
        if(curr == undefined || range.isDisjointFrom(cell)) {
            return;
        } else if(range.contains(cell)) { // curr and its subtree are within range
            // However, the radius makes a circle, so we still need to check for those on the edges
            // (need to check for those within the range but not within the radius)
            // note that range is a Rectangle that is square and with sides of length 2*radius
            // the center of range is the location of the load

            UtilityFunctions.subtreeToArray(curr).forEach(robot => withinRange.push(robot));
            return;
        } else { // the two cells intersect

            if(curr.Location.isInside(range)) {
                withinRange.push(curr.robot)
            }

            this.findWithinRangeRobots(range, curr.left, curr.getLeftCell(cell), withinRange);
            this.findWithinRangeRobots(range, curr.right, curr.getRightCell(cell), withinRange);

            return;
        }
    }
    

}

module.exports = RoboTree;