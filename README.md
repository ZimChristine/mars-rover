# Take Home Exercise

Please use Javascript to code the following exercise. 

#### Time Limit

You will have a week to work on this exercise, however our hope is you spend no more than 3-4 hours on it. We always welcome feedback so please let us know if it is taking longer than expected.

When submitting your exercise please include:

- A Readme for how to run the application and any tests (including any dependencies that must be downloaded). Also feel free to include any notes or tidbits about thought process as you tackled the exercise.

- Any comments to explain particular logic or call out something cool!

To submit your exercise, please create a repository in Github and email the link to [eng@join-real.com](mailto:eng@join-real.com). Also please email with any questions you may have. Happy Coding!

---

## Exercise: Mars Rover

A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau is rectangular and must be navigated by the rovers. A rover's position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North. In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).


## Requirements
Build a simple React frontend that communicates with a Node backend to achieve the following: 
- Provide a way to set the size of the plateau (the upper-right coordinates). The lower-left coordinates are assumed to be 0,0.
- Provide a way to take in a rover's position (x,y, cardinal direction (N,S,E,W))
- Provide a way to give the rover a series of instructions telling it which way to move on the plateau.
- Run the instructions and print out the final coordinates of the rover

**Example Input:**
- Plateau Size: 5 5
- Rover's Position: 1 2 N
- Rover Movement Instructions: LMLMLMLMM

**Expected Output:**
1 3 N


## Getting Started

- Make sure you have `yarn` installed on your machine. If you do not, please look at the following [installation instructions](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

Install all dependencies for the app:
```
yarn
```

### Server

- There is a basic NodeJS server set up(`server/server.js`). It utilizes [express](https://expressjs.com/).

To start running the server:
```
yarn server
```

### Frontend
To set up the frontend, make sure you're in the `client` directory. 

`client` is a React frontend project included for your use. We are not judging your CSS skills, but we do want to see an intuitive user experience. 

To setup and start the app run:
```
yarn client
```


## Testing
[Jest](https://jestjs.io/docs/getting-started) has been set up to run tests on both server and client code. Any test files you add must have the `.spec.js` appendix to be picked up by the test runner. 

Run `yarn test:client` to run frontend tests.

Run `yarn test:server` to run backend tests.