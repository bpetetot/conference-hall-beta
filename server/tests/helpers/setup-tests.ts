/* eslint-disable jest/no-done-callback */
import { Server } from 'node:http'
import supertest from 'supertest'
import * as db from '../../src/db/db'
import app from '../../src/app'

let server: Server

beforeAll((done) => {
  server = app.listen(async () => {
    done()
  })
})

afterAll((done) => {
  return server && server.close(done)
})

beforeEach(async (done) => {
  await db.resetTestDatabase()
  done()
})

afterAll(async (done) => {
  await db.disconnect()
  done()
})

export async function getAgent(token?: string) {
  const request = supertest.agent(server)
  if (token) {
    request.set({ Authorization: `Bearer ${token}` })
  }
  return request
}

// Mock console
global.console.info = jest.fn()
