const turnLeft = require('./index').turnLeft
const turnRight = require('./index').turnRight

const initialRoverState = { x: 1, y: 1, facing: 'W' }

test('turnLeft should change the direction correctly', () => {
  expect((turnLeft(initialRoverState)).facing).toBe('S')
  expect((turnLeft({ ...initialRoverState, facing: 'E' })).facing).toBe('N')
  expect((turnLeft({ ...initialRoverState, facing: 'S' })).facing).toBe('E')
  expect((turnLeft({ ...initialRoverState, facing: 'N' })).facing).toBe('W')
})

test('turnRight should change the direction correctlyt', () => {
  expect((turnRight(initialRoverState)).facing).toBe('N')
  expect((turnRight({ ...initialRoverState, facing: 'E' })).facing).toBe('S')
  expect((turnRight({ ...initialRoverState, facing: 'S' })).facing).toBe('W')
  expect((turnRight({ ...initialRoverState, facing: 'N' })).facing).toBe('E')
})

// TODO: moveForward!


// TODO: runMission