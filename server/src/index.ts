import app from './app'
import * as db from './db/db'
import config from './config'

const server = app.listen(config.PORT, () => {
  console.log(`Listening at http://localhost:${config.PORT}`)
})

function closeServer() {
  server.close(async () => {
    console.log('Http server closed.')
    await db.disconnect()
    console.log('Database connection closed.')
    process.exit(0)
  })
}

process.on('SIGTERM', closeServer)
process.on('SIGINT', closeServer)
