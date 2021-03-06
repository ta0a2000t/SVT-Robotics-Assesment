const Location = require('./Location');
const RoboNode = require('./RoboNode');


// static helper functions
class UtilityFunctions{
    
    // calculates the cutting dimension for the node of the current cell
	// if the box is too wide, the cutDim is vertical ( cutDim == 0)
	// else, horizontal (cutDim == 1)
    // returns 0 or 1
	static calcCutDim(cell) {
		let vertLength = Math.abs(cell.high.getY() - cell.low.getY());
		let horizLength = Math.abs(cell.high.getX() - cell.low.getX());   
		
		if(vertLength > horizLength) {
			return 1;
		} else {
			return 0;
		}
	}


    // roboArray is an Array of robots of length 3, the array can contain undefined robots
    // radius is an int, max distance from load to a robot
    // loadLocation is a Location, of the load

    // returns best robot (highest battery within the radius)
    // return value can be undefined if all robots in roboArray are too far
    static bestRobot(roboArray, validRadius, loadLocation) {
        let best = undefined;

        for (let index in roboArray) {
            let robot = (roboArray[index]);
            if(robot !== undefined) {

                if(loadLocation.getDistanceFrom(new Location(robot.x, robot.y)) <= validRadius){
                    // this robot is within the radius from the load

                    // below we get the robot with the highest battery...
                    if(best === undefined) {
                        best = robot;
                    } else {
    
                        if(robot.batteryLevel > best.batteryLevel) {
                            best = robot;
                        }
                    }
                }
            }
        }

        return best;
    }

    // returns an array containing all nodes in the roboNode subtree
    static subtreeToArray(roboNode) {
        let array = new Array(0);

        UtilityFunctions.subtreeToArrayAux(roboNode, array);

        return array;
    }

    // curr is a robot
    static subtreeToArrayAux(curr, array) {
        if(curr != undefined) {
            array.push(curr.robot);
            UtilityFunctions.subtreeToArrayAux(curr.left, array);
            UtilityFunctions.subtreeToArrayAux(curr.right, array);
        }
    }

    // shuffles and randomize an array
    static shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }



}
module.exports = UtilityFunctions;