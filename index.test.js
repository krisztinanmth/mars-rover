const turnLeft = require('./index').turnLeft
const turnRight = require('./index').turnRight
const moveForward = require('./index').moveForward

const initialRoverPosition = { x: 1, y: 1 }

test('moveForward should change the position of the rover correctly', () => {
  expect((moveForward({ ...initialRoverPosition, facing: 'W' })).x).toBe(0)
  expect((moveForward({ ...initialRoverPosition, facing: 'E' })).x).toBe(2)
  expect((moveForward({ ...initialRoverPosition, facing: 'S' })).y).toBe(0)
  expect((moveForward({ ...initialRoverPosition, facing: 'N' })).y).toBe(2)
})

test('moveForward should not change the position of the rover if it is lost', () => {
  expect((moveForward({ x: 0, y: 0, facing: 'W' })).x).toBe(0)
  expect((moveForward({ x: 8, y: 0, facing: 'E' })).x).toBe(8)
  expect((moveForward({ x: 8, y: 0, facing: 'S' })).y).toBe(0)
  expect((moveForward({ x: 8, y: 4, facing: 'N' })).y).toBe(4)
})

test('turnLeft should change the direction correctly', () => {
  expect((turnLeft({ ...initialRoverPosition, facing: 'W' })).facing).toBe('S')
  expect((turnLeft({ ...initialRoverPosition, facing: 'E' })).facing).toBe('N')
  expect((turnLeft({ ...initialRoverPosition, facing: 'S' })).facing).toBe('E')
  expect((turnLeft({ ...initialRoverPosition, facing: 'N' })).facing).toBe('W')
})

test('turnLeft should should not change the direction of an already lost rover', () => {
  expect((turnLeft({ ...initialRoverPosition, facing: 'W', isLost: true })).facing).toBe('W')
  expect((turnLeft({ ...initialRoverPosition, facing: 'E', isLost: true })).facing).toBe('E')
  expect((turnLeft({ ...initialRoverPosition, facing: 'S', isLost: true })).facing).toBe('S')
  expect((turnLeft({ ...initialRoverPosition, facing: 'N', isLost: true })).facing).toBe('N')
})

test('turnRight should change the direction correctly', () => {
  expect((turnRight({ ...initialRoverPosition, facing: 'W' })).facing).toBe('N')
  expect((turnRight({ ...initialRoverPosition, facing: 'E' })).facing).toBe('S')
  expect((turnRight({ ...initialRoverPosition, facing: 'S' })).facing).toBe('W')
  expect((turnRight({ ...initialRoverPosition, facing: 'N' })).facing).toBe('E')
})

test('turnRight should should not change the direction of an already lost rover', () => {
  expect((turnRight({ ...initialRoverPosition, facing: 'W', isLost: true })).facing).toBe('W')
  expect((turnRight({ ...initialRoverPosition, facing: 'E', isLost: true })).facing).toBe('E')
  expect((turnRight({ ...initialRoverPosition, facing: 'S', isLost: true })).facing).toBe('S')
  expect((turnRight({ ...initialRoverPosition, facing: 'N', isLost: true })).facing).toBe('N')
})
