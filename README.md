# SVT Robotics Assesment
 
 ## Overview:
 This is a CLI program that finds the best robot to perfrom a task within a radius (default set to 10).
 It a list of robots from https://60c8ed887dafc90017ffbd56.mockapi.io/robots.

 Then, the program asks the user to specify three arguments, and an optional fourth one :
- loadId: a string containing an arbitrary ID of the load which needs to be moved.
- x: a number indicating the x coordinate of the load which needs to be moved.
- y: a number indicating the y coordinate of the load which needs to be moved.
- radius: a number indicating the radius around the 'load'.

##### Sample prompt from the CLI: 
###### Usage: loadId:String x:int y:int radius:int(default: 10)


#### Example1 input from user:
###### 8f2 4 56

#### Example1 result:
###### Result using the KD-Tree approach:
###### { batteryLevel: 80, y: 63, x: 5, robotId: '97' }

###### Result using the simple linear search approach:
###### { batteryLevel: 80, y: 63, x: 5, robotId: '97' }


#### Example2 input from user:
###### 8f2 4 56 100000

#### Example2 result:
###### Result using the KD-Tree approach:
###### { batteryLevel: 100, y: 53, x: 38, robotId: '56' }

###### Result using the simple linear search approach:
###### { batteryLevel: 100, y: 53, x: 38, robotId: '56' }

##### Note: it is expected that both appreaches should find the same best robot.

## To start:
#### npm install
###### then, either:
##### $ npm start
###### or 
##### $ node app.js

## Implementation:
#### KD Tree Implementation
######
#### Simple Linear Search Implementation

