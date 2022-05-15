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
            let cutDim = UtilityFunctions.calcCutDim(bbx);
            let newNode = new RoboNode(robot, new Location(robot.x, robot.y), cutDim);
            this.root = newNode;

        } else {
            if(this.root.isInputLeft(new Location(robot.x, robot.y))) { // if at left or down side
                return this.root.insert(robot, this.root.getLeftCell(bbx));
            } else {
                return this.root.insert(robot, this.root.getRightCell(bbx));
            }
        }
    }

    // loadLocation is a Location
    // validRadius is an int, the maximum distance from the load to a robot
    getBestRobot(loadLocation, validRadius) {
        let rangeLower = new Location(loadLocation.x - validRadius, loadLocation.y - validRadius);
        let rangeHigher = new Location(loadLocation.x + validRadius, loadLocation.y + validRadius);
        let range = new Rectangle(rangeLower, rangeHigher);

        return getBestRobotAux(range, this.root, loadLocation, validRadius);
    }
    
    // recursive
    // range is a Rectangle
    // curr is a RoboNode
    // cell is a Rectangle
    getBestRobotAux(range, curr, cell, loadLocation, validRadius) {
        if(curr == undefined || range.isDisjointFrom(cell)) {
            return undefined;
        } else if(range.contains(cell)) { // curr and its subtree are within range
            // However, the radius makes a circle, so we still need to check for those on the edges
            // (need to check for those within the range but not within the radius)
            // note that range is a Rectangle that is square and with sides of length 2*radius
            // the center of range is the location of the load
            return UtilityFunctions.getBestRobotAux(subtreeToArray(curr),  validRadius, loadLocation);

        } else {
            let bestLeft = getBestRobotAux(range, curr.left, curr.getLeftCell(cell), loadLocation, validRadius);
            let bestRight = getBestRobotAux(range, curr.right, curr.getRightCell(cell), loadLocation, validRadius);
            
            return UtilityFunctions.getBestRobotAux([bestLeft, bestRight, curr],  validRadius, loadLocation);
        }
    }
    

}

module.exports = RoboTree;