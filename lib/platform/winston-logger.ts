import * as winston from "winston"

/* istanbul ignore next */
const logFormatter = winston.format.printf(({ level, label, message, timestamp, stack }) => {
  const body = stack ? `${message} - ${stack}` : message

  if (label) {
    return `[${level}] [${timestamp}] (RequestId=${label}): ${body} `
  } else {
    return `[${level}] [${timestamp}]: ${body} `
  }
})

const createConsoleTransport = (requestId?: string) => {
  return new winston.transports.Console({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.colorize({ all: true }),
      winston.format.label({ label: requestId }),
      winston.format.timestamp(),
      logFormatter
    ),
  })
}

export const WinstonLogger = winston.createLogger({
  level: process.env.LOG_LEVEL?.toLowerCase() || "debug",
  transports: [createConsoleTransport()],
})

export const applyRequestId = (requestId: string) => {
  WinstonLogger.clear()
  WinstonLogger.add(createConsoleTransport(requestId))
}
