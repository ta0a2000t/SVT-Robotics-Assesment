const Location = require('./Location');
const Rectangle = require('./Rectangle');
const UtilityFunctions = require('./UtilityFunctions');

// represents a node within a KD-Tree
// has a robot
class RoboNode {
    constructor(robot, Location, cutDim) {
        this.robot = robot;
        this.Location = Location;
        this.cutDim = cutDim;

        this.left = undefined;
        this.right = undefined;
    }

    // otherLocation: Location
    // returns true if other is left(when cutDim == 0, vertical cut),
    // or down(when cutDim == 1, horizontal cut) of the current Location
    isInputLeftSide(otherLocation) {
        if(otherLocation.get(this.cutDim) < this.Location.get(this.cutDim)) {
            return true;
        } else {
            return false;
        }    
    }


    // cell is a Rectangle
    // returns a Rectangle representing left or down side
    getLeftCell(cell) {
        let childHigh = undefined;
        let childLow = undefined;
        if(this.cutDim == 0) { // if "this" is vertical cut
            childHigh = new Location(this.Location.getX(), cell.getHigh().getY());
            childLow = new Location(cell.getLow().getX(), cell.getLow().getY());
        } else {
            childHigh = new Location(cell.getHigh().getX(), this.Location.getY());
            childLow = new Location(cell.getLow().getX(), cell.getLow().getY());
        }
        
        return new Rectangle(childLow, childHigh);
    }


    // cell is a Rectangle
    // returns a Rectangle representing right or upper side
    getRightCell(cell) {
        let childHigh = undefined;
        let childLow = undefined;
        if(this.cutDim == 0) { // if "this" is vertical cut
            childHigh = new Location(cell.getHigh().getX(), cell.getHigh().getY());
            childLow = new Location(this.Location.getX(), cell.getLow().getY());
        } else {
            childHigh = new Location(cell.getHigh().getX(), cell.getHigh().getY());
            childLow = new Location(cell.getLow().getX(), this.Location.getY());
        }
        return new Rectangle(childLow, childHigh);
    }


    // assumes inputs are not undefined
    // void
    insert(robot, cell) {
        this.insertAux(this, robot, cell);
    }

    // recursive...
    // curr is a RoboNode
    // robot is a robot
    // cell is a Rectangle
    // void
	insertAux(curr, robot, cell) {
		if(curr.isInputLeftSide(new Location(robot.x, robot.y))) { // if new node at left side
			if(curr.left == undefined) { // insert as left child

                let cutDim = UtilityFunctions.calcCutDim(cell);
                let newNode = new RoboNode(robot, new Location(robot.x, robot.y), cutDim);
                
                curr.left = newNode;
								
			} else {
			    this.insertAux(curr.left, robot, curr.getLeftCell(cell));
			}
		} else { // right side, insert as right child
			if(curr.right == undefined) {

                let cutDim = UtilityFunctions.calcCutDim(cell);
                let newNode = new RoboNode(robot, new Location(robot.x, robot.y), cutDim);

				curr.right = newNode;
			} else {
				this.insertAux(curr.right, robot, curr.getRightCell(cell));
			}
		}
	}
}

module.exports = RoboNode;