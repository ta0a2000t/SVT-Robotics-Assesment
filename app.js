const axios = require('axios');
const RoboTree = require('./src/RoboTree');
const Location = require('./src/Location');
const Rectangle = require('./src/Rectangle');
const UtilityFunctions = require('./src/UtilityFunctions');

let arguments = process.argv;

const VALID_RADIUS = arguments[5] || 10; // only consider robots within this radius, default 10
const URL = "https://60c8ed887dafc90017ffbd56.mockapi.io/robots";

let targetLoad = {
    loadId : arguments[2],
    x : parseInt(arguments[3]),
    y : parseInt(arguments[4])
}

getRobotsArray(URL).then(function(robots){
    let boundingBox = new Rectangle(new Location(0, 0), new Location(100, 100)); // the warehouse
    let roboTree = new RoboTree(boundingBox);

    UtilityFunctions.shuffle(robots); // randomize the array of robots. Since we want to construct the roboTree, 
                 // we will insert each robot one by one. If the array of robots was sorted by location, 
                // then our roboTree won't be balanced, so search and insert operations would be slower.

    // construct the tree
    for(let robot of robots) {
        roboTree.insert(robot);
    }

    let loadLocation = new Location(targetLoad.x, targetLoad.y);

    console.log(roboTree.getBestRobot(loadLocation, VALID_RADIUS, robots));
});



async function getRobotsArray(url) {
    return await axios(url).then(response => response.data);
}


// uses the simple way, loop through all robots and only consider those within the radius, and
// then return the one with the highest battery.
// targetLoad.loadId: string
// targetLoad.x: int
// targetLoad.y: int
// returns a robot
function getBestRobot(targetLoad, robots) {
    console.log(targetLoad);


}




