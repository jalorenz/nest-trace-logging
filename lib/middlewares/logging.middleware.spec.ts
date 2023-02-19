import { LoggingMiddleware } from "./logging.middleware"
import * as logger from "../platform/logger-proxy"
import * as sinon from "sinon"

describe("LoggingMiddleware", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const loggerProxyStub = sinon.stub(logger, "loggerProxy").returns({})

    let middleware: LoggingMiddleware

    beforeEach(() => {
        loggerProxyStub.reset()

        middleware = new LoggingMiddleware()
    })

    it("use should append request id as header attribute to response", async () => {
        const response = {
            setHeader: sinon.stub()
        }

        middleware.use(sinon.stub(), response, sinon.stub())

        expect(response.setHeader.getCall(0).firstArg).toStrictEqual("X-Request-Id")
        expect(response.setHeader.getCall(0).lastArg).toStrictEqual(expect.any(String))
    })
})