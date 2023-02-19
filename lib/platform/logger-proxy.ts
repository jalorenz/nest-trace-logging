import { NextFunction } from "express"
import { applyRequestId, WinstonLogger } from "./winston-logger"
import { context } from "./async-storage"

const logger_key = "business_logic_logger"

/* istanbul ignore next */
export const Logger = new Proxy(WinstonLogger, {
  get(target, p, receiver) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target = context.getStore()?.get(logger_key) || target
    return Reflect.get(target, p, receiver)
  },
})

export const loggerProxy = (requestId: string, next: NextFunction) => {
  applyRequestId(requestId)

  const store = new Map()
  store.set(logger_key, WinstonLogger)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return context.run(store, next)
}
