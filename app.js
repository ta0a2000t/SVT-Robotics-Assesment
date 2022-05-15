const axios = require('axios');
const RoboTree = require('./src/RoboTree');
const Location = require('./src/Location');
const Rectangle = require('./src/Rectangle');

let arguments = process.argv;

let targetLoad = {
    loadId : arguments[2],
    x : parseInt(arguments[3]),
    y : parseInt(arguments[4])
}

const URL = "https://60c8ed887dafc90017ffbd56.mockapi.io/robots";


getRobotsArray(URL).then(function(robots){
    console.log(getBestRobot(targetLoad, robots));
});






function getRobotsArray(url) {
    return axios(url).then(response => response.data);
}

// loadId: string
// x: int
// y: int
// returns a robot
function getBestRobot(targetLoad, robots) {
    console.log(targetLoad);


}





