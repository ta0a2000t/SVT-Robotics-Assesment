const axios = require('axios');
const readline = require('node:readline');
// js files...
const RoboTree = require('./src/RoboTree');
const Location = require('./src/Location');
const Rectangle = require('./src/Rectangle');
const UtilityFunctions = require('./src/UtilityFunctions');

const URL = "https://60c8ed887dafc90017ffbd56.mockapi.io/robots";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '##############################################################\n'
    + 'Usage: loadId:String x:int y:int radius:int(default: 10)\n'
});

// url: String
async function getRobotsArray(url) {
    return await axios(url).then(response => response.data);
}


// runs once at the begginning of this cli program
function constructKDRoboTree(robots) {
    let boundingBox = new Rectangle(new Location(0, 0), new Location(100, 100)); // the warehouse
    let roboTree = new RoboTree(boundingBox);


    // construct the tree
    for(let robot of robots) {
        roboTree.insert(robot);
    }

    return roboTree;
}


// targetLoad.loadId: string
// targetLoad.location: Location
// returns a robot
function getBestRobot(roboTree, targetLoad, validRadius) {

    let best = roboTree.getBestRobot(targetLoad.location, validRadius);

    console.log("");
    console.log("Result using the KD-Tree approach:")
    console.log(best);

    //console.log("KD-Tree Construction| Time: O( nlog(n) )  ,   Space: O(n) ");
    //console.log("Find Best Robot| Time: O( log(n) )  ,   Space: O( log(n) ) ");
    console.log("");
}


// uses the simple way, loop through all robots and only consider those within the radius, and
// then return the one with the highest battery.
// targetLoad.loadId: string
// targetLoad.location: Location

// returns a robot
function simpleGetBestRobot(robots, targetLoad, validRadius) {
    let best = UtilityFunctions.bestRobot(robots, validRadius, targetLoad.location);
    console.log({validRadius});

    console.log("");
    console.log("Result using the simple linear search approach:")
    console.log(best);
    
    //console.log("Find Best Robot| Time: O(n)  ,   Space: O(1) ");
    console.log("");
}

        // robots: array of robots, for the linear search
        // roboTree: RoboTree, for the KDTree's logarithmic search
function startCLILoop(robots, roboTree) {
    rl.prompt();
    rl.on('line', (line) => {
        const arguments = line.trim().split(' ');
        const validRadius = parseInt(arguments[3]) || 10; // only consider robots within this radius, default 10
        
        const targetLoad = {
            loadId : arguments[0],
            location: new Location(parseInt(arguments[1]), parseInt(arguments[2]))
        };
        if(isNaN(targetLoad.location.getX()) || isNaN(targetLoad.location.getY())) {
            console.log("invalid arguemnts! Try again...");
        } else if(validRadius !== undefined && isNaN(validRadius)) {
            console.log("invalid radius! Try again...");
        } else {
            getBestRobot(roboTree, targetLoad, validRadius);
            simpleGetBestRobot(robots, targetLoad, validRadius)
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Program Closed!');
        process.exit(0);
    });
}

function main() {
    getRobotsArray(URL).then(function(robots) {
        // randomize the array of robots to get a KD-Tree of height O(log(n)) in expectancy.
        UtilityFunctions.shuffle(robots); 
        // Since we want to construct the roboTree, 
            // we will insert each robot one by one. If the array of robots was sorted by location in the API, 
            // then our roboTree won't be balanced; search and insert operations would be slower.

        let roboTree = constructKDRoboTree(robots);

        startCLILoop(robots, roboTree);
    })

}


main();

