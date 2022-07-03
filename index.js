const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

const turnLeft = ({ facing, ...position }) => {
  const leftLookup = {
    E: 'N',
    S: 'E',
    W: 'S',
    N: 'W',
  }

  return {
    ...position,
    facing: leftLookup[facing]
  }
}

const turnRight = ({ facing, ...position }) => {
  const rightLookup = {
    E: 'S',
    S: 'W',
    W: 'N',
    N: 'E',
  }

  return {
    facing: rightLookup[facing],
    ...position,
  }
}

/**
 * TODO:
 * 
 * RESPECT BOUNDARY OF GRID
 * REFACTOR
 * UNIT TESTS
 * 
 * TODO:
 */

/**
 * 
 * TODO: 
 * 
 * A little documentation goes a long way. If you can, include a readme file that tells us how to run your project.
 * 
 * TODO: MUST!
 */


const moveForward = ({ x, y, facing }) => {
  const forwardLookup = {
    E: (x, y) => ({ x: x + 1, y }),
    S: (x, y) => ({ x, y: y - 1 }),
    W: (x, y) => ({ x: x + 1, y }),
    N: (x, y) => ({ x: x + 1, y }),
  }
  /**
   * FIXME: this function should respect the boundaries of the grid
   * - should not move forward any more 
   * - should save last valid position of rover
   * - and should turn isLost flag to true -> will be used later for output LOST
   */
  const newPosition = forwardLookup[facing](x, y)
  return {
    x: newPosition.x,
    y: newPosition.y,
    facing: facing,
  }
}

// TODO: should throw an Error if moves includes any unsupported character
const mapMovesToFunctions = (moves) => moves.split('').map(character => {
  if (character === 'L') return turnLeft
  if (character === 'R') return turnRight
  if (character === 'F') return moveForward
})

const runMission = (row, column, posX, posY, direction, moves) => {
  // const grid = new Array(Number(row)).fill(0).map(() => new Array(Number(column)).fill(0))

  /**
   * TODO: FIXME:
   * row ad column should be used for boundaries!!!
   */
  
  const initialRoverState = { x: Number(posX), y: Number(posY), facing: direction }

  const { x, y, facing, isLost = false } = pipe(
    ...mapMovesToFunctions(moves)
  )(initialRoverState)

  return `(${x}, ${y}, ${facing}) ${isLost ? 'LOST' : ''}`
}

// TODO: validate args 🤔 FIXME:
const myArgs = process.argv.slice(2)
console.log('myArgs: ', myArgs) // FIXME: clean up all console.logs

const [ row, column, x, y, direction, moves ] = myArgs

runMission(row, column, x, y, direction, moves)

console.log(runMission(row, column, x, y, direction, moves))


module.exports = {
  turnLeft,
  turnRight,
}