# SVT Robotics Assesment
 
 ## Overview:
 This is a CLI program that finds the best robot to perfrom a task.
 It finds the robot with the highest battery level within a radius from the load (default radius: 10).
 It reads a list of robots from https://60c8ed887dafc90017ffbd56.mockapi.io/robots.

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

##### Note: it is expected that both appreaches find the same best robot.

## To start:
#### npm install
###### then, either:
##### $ npm start
###### or 
##### $ node app.js

## Two Implementations:
### KD-Tree
- Constructs a KD-Tree using a randomly shuffled list of robots. (This is done only onceat the launch of the program)
- Perform range search to identify robots that are close to the load.
- Now we have an array of close robots, perfomr a Simple Linear Search.

###### KD-Tree Construction| Time: O( nlog(n) )  ,   Space: O(n)
###### Find Best Robot| Time: O( log(n) )  ,   Expected Space: O( log(n) )
- Complexity proportional to hegiht of the tree, 'expected' since we shuffle the robot array randomly.

### Simple Linear Search
- Go through a randomly shuffled list of robots.
- For every robot, check if the robot is within the radius from the load and do not consider if it is not.
- Report the robot with the highest battery level and is within the radius from the load.

###### Find Best Robot| Time: O(n)  ,   Space: O(1) 


## Additional Possible Fueatures:
#### KD-Tree(RoboTree) Delete functionality:
- Deletes from the KD-Tree(RoboTree) a robot that is currently busy carrying a load.

#### Make Sure the RoboTree Is Not Skewed
##### Add a depth property to RoboNodes
- The depth property identifies how deep the RoboNode's furthest grandchild is.
- Update the depth during insertion/deletion.
#### After insertions or deletions, rebuild if too skewed:
- After an insertion/deletion, which is done recursively, check if the depth of an ancestor of the inserted/delted robot is too different from the depth of its sibling.
- Rebuild the subtree rooted at the parent of that ancestor and update cutting dimetions (if the current rectangle is too wide, the cutting dimetion would be vertical, otherwise horizontal). 
- To rebuild, make an array containing all the nodes of that subtree, then shuffle that array randomly to have an expected hieght of O(log(n)).

