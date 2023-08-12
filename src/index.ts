import app from './app'
import 'dotenv/config'
import { SERVER_PORT } from './config'

export const start = async () => {
  console.log('inster starting')

  app.listen(SERVER_PORT, () => {
    console.log(`inster server successfully started on port ${SERVER_PORT}`)
  })

  const stop = async () => {
    console.log('inster stopping')

    console.log('inster stopped')
    process.exit()
  }

  process.on('SIGINT', stop)
  process.on('SIGTERM', stop)
}

start()
