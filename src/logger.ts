import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  exitOnError: true,
  format: format.json(),
  transports: [new transports.Console({ handleExceptions: true })],
})

export const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  return error
}

export default logger
