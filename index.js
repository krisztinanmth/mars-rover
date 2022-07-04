const myArgs = process.argv.slice(2)
const [ boundaryY, boundaryX, x, y, direction, moves ] = myArgs

const moveForward = (roverState) => {
  if (roverState.isLost) return roverState

  const forwardLookup = {
    E: (x, y) => ({ x: x + 1, y }),
    S: (x, y) => ({ x, y: y - 1 }),
    W: (x, y) => ({ x: x - 1, y }),
    N: (x, y) => ({ x, y: y + 1 }),
  }

  const { facing, x, y } = roverState

  const newPosition = forwardLookup[facing](x, y)
  const isOutsideBoundaryX = newPosition.x < 0 || newPosition.x > Number(boundaryX)
  const isOutsideBoundaryY = newPosition.y < 0 || newPosition.y > Number(boundaryY)

  return (isOutsideBoundaryX || isOutsideBoundaryY)
    ? { ...roverState, isLost: true }
    : {
      x: newPosition.x,
      y: newPosition.y,
      facing: facing,
    }
}

const turnLeft = (roverState) => {
  if (roverState.isLost) return roverState

  const { facing, ...position } = roverState

  const leftTurnCardinals = {
    E: 'N',
    S: 'E',
    W: 'S',
    N: 'W',
  }
  return {
    facing: leftTurnCardinals[facing],
    ...position,
  }
}

const turnRight = (roverState) => {
  if (roverState.isLost) return roverState

  const { facing, ...position } = roverState

  const rightTurnCardinals = {
    E: 'S',
    S: 'W',
    W: 'N',
    N: 'E',
  }
  return {
    facing: rightTurnCardinals[facing],
    ...position,
  }
}

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

const moveRover = (posX, posY, direction, moves) => {
  const initialRoverState = { x: Number(posX), y: Number(posY), facing: direction }

  const { x, y, facing, isLost = false } = pipe(
    ...(moves.split('').map(character => {
      if (character === 'L') return turnLeft
      if (character === 'R') return turnRight
      if (character === 'F') return moveForward
    }))
  )(initialRoverState)

  return `(${x}, ${y}, ${facing})${isLost ? ' LOST' : ''}`
}

console.log(moveRover(x, y, direction, moves))

module.exports = {
  moveForward,
  turnLeft,
  turnRight,
  moveRover,
}