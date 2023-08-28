import app from './app'
import { PORT } from './config'
import logger from './logger'
import pool from './psql/psqlAuth'

export const start = async () => {
  const type = 'Inster'
  logger.info({
    type: type,
    message: `${type}: Starting now.`,
  })

  app.listen(PORT, () => {
    logger.info({
      type: type,
      message: `${type}: Server successfully started on port ${PORT}`,
    })
  })

  const stop = async () => {
    logger.info({
      type: type,
      message: `${type}: Stopping now.`,
    })

    await pool.end()

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
