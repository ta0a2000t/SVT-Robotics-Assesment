const axios = require('axios');
const RoboTree = require('./src/RoboTree');
const Location = require('./src/Location');
const Rectangle = require('./src/Rectangle');
const UtilityFunctions = require('./src/UtilityFunctions');

let arguments = process.argv;

const VALID_RADIUS = parseInt(arguments[5]) || 10; // only consider robots within this radius, default 10
const URL = "https://60c8ed887dafc90017ffbd56.mockapi.io/robots";

let targetLoad = {
    loadId : arguments[2],
    location: new Location(parseInt(arguments[3]), parseInt(arguments[4]))
}




main();


// url: String
async function getRobotsArray(url) {
    return await axios(url).then(response => response.data);
}

// targetLoad.loadId: string
// targetLoad.location: Location
// returns a robot
function getBestRobot(targetLoad) {
    getRobotsArray(URL).then(function(robots){
        let boundingBox = new Rectangle(new Location(0, 0), new Location(100, 100)); // the warehouse
        let roboTree = new RoboTree(boundingBox);
    
        // randomize the array of robots to get a KD-Tree of height O(log(n)) in expectancy.
        UtilityFunctions.shuffle(robots); 
            //Since we want to construct the roboTree, 
                // we will insert each robot one by one. If the array of robots was sorted by location in the API, 
                // then our roboTree won't be balanced; search and insert operations would be slower.

        // construct the tree
        for(let robot of robots) {
            roboTree.insert(robot);
        }
    
        let best = roboTree.getBestRobot(targetLoad.location, VALID_RADIUS, robots);

        console.log("");
        console.log("Result using the KD-Tree approach:")
        console.log(best);

        console.log("KD-Tree Construction| Time: O( nlog(n) )  ,   Space: O(n) ");
        console.log("Find Best Robot| Time: O( log(n) )  ,   Space: O( log(n) ) ");
        console.log("");
    });
}


// uses the simple way, loop through all robots and only consider those within the radius, and
// then return the one with the highest battery.
// targetLoad.loadId: string
// targetLoad.location: Location

// returns a robot
function simpleGetBestRobot(targetLoad) {
    getRobotsArray(URL).then(function(robots){
        let best = UtilityFunctions.bestRobot(robots, VALID_RADIUS, targetLoad.location);


        console.log("");
        console.log("Result using the simple linear search approach:")
        console.log(best);

        console.log("Find Best Robot| Time: O(n)  ,   Space: O(1) ");
        console.log("");
    });
}

function main() {
    getBestRobot(targetLoad);

    simpleGetBestRobot(targetLoad);
}









