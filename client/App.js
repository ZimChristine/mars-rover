import React from "react";
import WallEImg from "./images/wall-e.png";

function Box({ props, children }) {
  return (
    <div
      style={{ border: "1px solid #999", margin: "2px", padding: "4px" }}
      {...props}
    >
      {children}
    </div>
  );
}

function HintText({ props, children }) {
  return (
    <p style={{ color: "#999" }} {...props}>
      {children}
    </p>
  );
}

function ErrorText({ props, children }) {
  return (
    <p style={{ color: "red" }} {...props}>
      {children}
    </p>
  );
}

function Plateau({ x, y, roverPosition, rover }) {
  const grid = React.useMemo(() => {
    return [Array(y).fill(Array(x).fill())][0]
      .map((squares, squaresIndex) => {
        return squares.map((square, squareIndex) => {
          return {
            y: squaresIndex,
            x: squareIndex,
          };
        });
      })
      .reverse();
  }, [x, y]);

  return (
    <div>
      <h3>{`Plateau`}</h3>
      <div>
        <table style={{ margin: "auto" }}>
          <tbody>
            {/* using index an a key is normally an no, no. The grid is memoized and guanranteed to not change therefore it is unlikely to encounter the typical bugs introduced by using index as key. */}
            {grid.map((squares, index) => (
              <tr key={index}>
                {squares.map((square) => (
                  <td
                    key={square.x}
                    style={{
                      border: "1px solid #999",
                      height: "34px",
                      width: "34px",
                      color: "#999",
                    }}
                  >
                    {square.x === roverPosition.x &&
                    square.y === roverPosition.y
                      ? rover
                      : `${square.x}, ${square.y}`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlateauSettings({ setPlateauSettings }) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleSubmitPlateauSettings = (e) => {
    e.preventDefault();
    let [x, y] = e.target.elements.plateauCoords.value.split(" ");
    x = parseInt(x);
    y = parseInt(y);
    if (!x || x < 0 || x > 10 || !y || y < 0 || y > 10) {
      setErrorMessage(
        `Enter a valid x and y value between 1-10. You entered x: ${x}, y: ${y}`
      );
      return null;
    }
    setPlateauSettings({ x, y });
    setErrorMessage(null);
  };

  return (
    <Box>
      <form id="form" onSubmit={handleSubmitPlateauSettings}>
        <div>
          <label htmlFor="input">Plateau Coordinates</label>
          <input type="text" id="plateauCoords" />
          <HintText>
            {"Enter plateau coordinates separated by a space: e.g. '5 5'"}
          </HintText>
          <HintText>{`hint: maximum 10 by 10 is allowed, zero inclusive`}</HintText>
        </div>
        {errorMessage ? <ErrorText>{`${errorMessage}`}</ErrorText> : null}
        <button type="submit">Create Plateau</button>
      </form>
    </Box>
  );
}

function RoverPositionSettings({ setRoverPosition, plateauSettings }) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleSubmitRoverPosition = (e) => {
    e.preventDefault();
    let [x, y, direction] = e.target.elements.roverCoords.value.split(" ");
    x = x && parseInt(x);
    y = y && parseInt(y);
    direction = direction && direction.toUpperCase();
    if (!valuesAreValid({ x, y, direction })) {
      setErrorMessage(`Enter valid xy coordinates and cardinal direction.`);
      return null;
    }
    setRoverPosition({ x, y, direction });
    setErrorMessage(null);
  };

  const valuesAreValid = ({ x, y, direction }) => {
    return (
      x >= 0 &&
      x < plateauSettings.x &&
      y >= 0 &&
      y < plateauSettings.y &&
      (direction === "N" ||
        direction === "S" ||
        direction === "E" ||
        direction === "W")
    );
  };

  return (
    <Box>
      <form id="form" onSubmit={handleSubmitRoverPosition}>
        <div>
          <label htmlFor="input">Rover Position Coordinates</label>
          <input type="text" id="roverCoords" />
          <HintText>{`Enter rover coordinates and cardinal direction separated by a space: e.g. '0 0 N'`}</HintText>
          <HintText>{`hint: stay within the plateau and use cardinal coordinates NSEW`}</HintText>
        </div>
        {errorMessage ? <ErrorText>{`${errorMessage}`}</ErrorText> : null}
        <button type="submit">Position Rover</button>
      </form>
    </Box>
  );
}

function MoveRoverInstructions({
  setRoverPosition,
  roverPosition,
  plateauSettings,
}) {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleSubmitRoverInstructions = (e) => {
    e.preventDefault();
    const moveInstructions =
      e.target.elements.moveRoverInstructions.value.toUpperCase();
    const nextRoverPosition = convertMovesToRoverPosition(
      moveInstructions,
      roverPosition,
      plateauSettings
    );
    if (!nextRoverPosition) {
      setErrorMessage(
        "Uhoh, the rover was moved off the plateau. Try another set of instructions!"
      );
      return;
    }
    setRoverPosition(nextRoverPosition);
    setErrorMessage(null);
    document.getElementById("roverInstructionsForm").reset();
  };

  return (
    <Box>
      <form id="roverInstructionsForm" onSubmit={handleSubmitRoverInstructions}>
        <div>
          <label htmlFor="input">Move Rover Instructions</label>
          <input type="text" id="moveRoverInstructions" />
          <HintText>{`Values L, R, and M are valid: e.g. 'LRMMLM'`}</HintText>
          {errorMessage ? <ErrorText>{`${errorMessage}`}</ErrorText> : null}
        </div>
        <button type="submit">Move Rover</button>
      </form>
    </Box>
  );
}

function MarsRover() {
  const [plateauSettings, setPlateauSettings] = React.useState({ x: 3, y: 4 });
  const [roverPosition, setRoverPosition] = React.useState({
    x: 1,
    y: 0,
    direction: "E",
  });
  const [rover, setRover] = React.useState(
    getRoverIcon(roverPosition.direction)
  );
  React.useEffect(() => {
    setRover(getRoverIcon(roverPosition.direction));
  }, [roverPosition, setRover]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <PlateauSettings setPlateauSettings={setPlateauSettings} />
        <RoverPositionSettings
          setRoverPosition={setRoverPosition}
          plateauSettings={plateauSettings}
        />
        <MoveRoverInstructions
          setRoverPosition={setRoverPosition}
          roverPosition={roverPosition}
          plateauSettings={plateauSettings}
        />
        <Box>
          {`Rover Position: ${roverPosition.x} ${roverPosition.y} ${roverPosition.direction}`}
        </Box>
      </div>
      <Plateau
        x={plateauSettings.x}
        y={plateauSettings.y}
        roverPosition={roverPosition}
        rover={rover}
      />
    </div>
  );
}

function getRoverIcon(direction) {
  const rovers = {
    north: "⬆️",
    south: "⬇️",
    east: "➡️",
    west: "⬅️",
  };
  if (direction === "E") {
    return rovers.east;
  } else if (direction === "W") {
    return rovers.west;
  } else if (direction === "N") {
    return rovers.north;
  } else if (direction === "S") {
    return rovers.south;
  }
}

function convertMovesToRoverPosition(moves, roverPosition, plateauSettings) {
  let currentRoverPosition = { ...roverPosition };
  const nextRoverPositions = [...moves]
    .filter((char) => char !== "L" || char !== "R" || char !== "M")
    .map((move) => {
      currentRoverPosition = calculateRoverPosition(move, currentRoverPosition);
      return currentRoverPosition;
    });
  const isValid = isValueInBounds(
    nextRoverPositions[nextRoverPositions.length - 1],
    plateauSettings
  );
  if (!isValid) {
    return null;
  }
  return nextRoverPositions[nextRoverPositions.length - 1];
}

function calculateRoverPosition(move, currentRoverPosition) {
  let { x, y, direction } = currentRoverPosition;
  if (move === "L" || move === "R") {
    direction = calculateNewDirection(move, currentRoverPosition.direction);
  } else if (move === "M") {
    const { newX, newY } = calculateCoordinateChange(currentRoverPosition);
    x = newX;
    y = newY;
  }
  return { x, y, direction };
}

function calculateCoordinateChange(roverPosition) {
  let x = roverPosition.x;
  let y = roverPosition.y;
  if (roverPosition.direction === "N") {
    y++;
  } else if (roverPosition.direction === "S") {
    y--;
  } else if (roverPosition.direction === "E") {
    x++;
  } else if (roverPosition.direction === "W") {
    x--;
  }
  return { newX: x, newY: y };
}

function calculateNewDirection(move, direction) {
  let newDirection = direction;
  if (move === "L") {
    if (direction === "N") {
      newDirection = "W";
    } else if (direction === "W") {
      newDirection = "S";
    } else if (direction === "S") {
      newDirection = "E";
    } else if (direction === "E") {
      newDirection = "N";
    }
  } else if (move === "R") {
    if (direction === "N") {
      newDirection = "E";
    } else if (direction === "E") {
      newDirection = "S";
    } else if (direction === "S") {
      newDirection = "W";
    } else if (direction === "W") {
      newDirection = "N";
    }
  }
  return newDirection;
}

function isValueInBounds(coords, plateauSettings) {
  return (
    coords.x >= 0 &&
    coords.x < plateauSettings.x &&
    coords.y >= 0 &&
    coords.y < plateauSettings.y
  );
}

function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <img src={WallEImg} height="200" alt="wall-e robot" />
      <h1>MARS ROVER</h1>
      <MarsRover />
    </div>
  );
}

export default App;
