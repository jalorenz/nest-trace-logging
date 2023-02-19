import { loggerProxy } from "./logger-proxy"
import * as winstonLogger from "./winston-logger"
import { stub } from "sinon"

describe("LoggerProxy", () => {
  const applyRequestIdStub = stub(winstonLogger, "applyRequestId")

  beforeEach(() => {
    applyRequestIdStub.reset()
  })

  it.each(["requestId", "anotherRequestId"])("should apply given request id to logger", (requestId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loggerProxy(requestId, () => {})

    expect(applyRequestIdStub).toHaveBeenCalledWith(requestId)
  })
})
