/* eslint-disable jest/no-done-callback */
import { Server } from 'node:http'
import supertest from 'supertest'
import * as db from '../../src/db/db'
import app from '../../src/app'

export function setupDatabase() {
  beforeEach(db.resetTestDatabase)
  afterAll(db.disconnect)
}

export function setupServer() {
  let server: Server

  beforeAll((done) => {
    server = app.listen(async () => {
      done()
    })
  })

  afterAll((done) => {
    if (server) server.close(done)
  })

  setupDatabase()

  return (token?: string) => {
    const request = supertest.agent(server)
    if (token) {
      request.set({ Authorization: `Bearer ${token}` })
    }
    return request
  }
}
