describe('Server test', () => {
  jest.mock('ffc-messaging')
  test('createServer returns server', () => {
    const server = require('../../../../app/server')
    expect(server).toBeDefined()
  })
})
