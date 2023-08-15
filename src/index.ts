import app from './app'
import { SERVER_PORT } from './config'
import logger from './logger'

export const start = async () => {
  const type = 'Inster'
  logger.info({
    type: type,
    message: `${type}: Starting now.`,
  })

  app.listen(SERVER_PORT, () => {
    logger.info({
      type: type,
      message: `${type}: Server successfully started on port ${SERVER_PORT}`,
    })
  })

  const stop = async () => {
    logger.info({
      type: type,
      message: `${type}: Stopping now.`,
    })

    logger.info({
      type: type,
      message: `${type}: Successfully stopped.`,
    })
    process.exit()
  }

  process.on('SIGINT', stop)
  process.on('SIGTERM', stop)
}

start()
