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
    getBestRobot(loadLocation, validRadius) {
        let rangeLower = new Location(loadLocation.x - validRadius, loadLocation.y - validRadius);
        let rangeHigher = new Location(loadLocation.x + validRadius, loadLocation.y + validRadius);
        let range = new Rectangle(rangeLower, rangeHigher);
        
        let best =  this.getBestRobotAux(range, this.root, this.bbx, loadLocation, validRadius);
        return best;
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
            return UtilityFunctions.bestRobot(UtilityFunctions.subtreeToArray(curr),  validRadius, loadLocation);

        } else { // they intersect
            let bestLeft = this.getBestRobotAux(range, curr.left, curr.getLeftCell(cell), loadLocation, validRadius);
            let bestRight = this.getBestRobotAux(range, curr.right, curr.getRightCell(cell), loadLocation, validRadius);
            let bestLeftRobot = (bestLeft == undefined) ? undefined : bestLeft.robot;
            let bestRightRobot = (bestRight == undefined) ? undefined : bestRight.robot;
            let currRobot = (curr == undefined) ? undefined : curr.robot;

            let best = UtilityFunctions.bestRobot([bestLeftRobot, bestRightRobot, currRobot],  validRadius, loadLocation);
            console.log(best);
            return best;
        }
    }
    

}

module.exports = RoboTree;