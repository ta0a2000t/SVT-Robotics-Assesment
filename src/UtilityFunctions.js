const Location = require('./Location');


// static helper functions
class UtilityFunctions{
    
    // calculates the cutting dimension for the node of the current cell
	// if the box is too wide, the cutDim is vertical ( cutDim == 0)
	// else, horizontal (cutDim == 1)
    // returns 0 or 1
	static calcCutDim(cell) {
		vertLength = Math.abs(cell.high.getY() - cell.low.getY());
		horizLength = Math.abs(cell.high.getX() - cell.low.getX());   
		
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

        // modify the roboArray, turn any robot into undefined if too far
        for (let index in roboArray) {
            let robot = (roboArray[index]);
            if(robot != undefined) {
                if(loadLocation.getDistanceFrom(new Location(robot.x, robot.y)) > validRadius){
                    roboArray[index] = undefined; // too far, do not consider this robot
                }
            }
        }
        // now all robots are within the radius from the load


        // below we get the robot with the highest battery...
        let best = undefined;
        for (let robot in roboArray) {
            if(robot != undefined) {
                if(best == undefined) {
                    best = robot;
                } else {
                    if(robot.batteryLevel > best.batteryLevel) {
                        best = robot;
                    }
                }
            }
        }

        return best;
    }



}
module.exports = UtilityFunctions;