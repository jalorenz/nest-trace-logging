import { applyRequestId, WinstonLogger } from "./winston-logger"
import * as sinon from "sinon"

describe("WinstonLogger", () => {
  let clearSpy: sinon.SinonSpy
  let addSpy: sinon.SinonSpy

  beforeEach(() => {
    clearSpy = sinon.spy(WinstonLogger, "clear")
    addSpy = sinon.spy(WinstonLogger, "add")
  })

  afterEach(() => {
    sinon.restore()
  })

  it("applyRequestId should clear all loggers", () => {
    applyRequestId("requestId")

    expect(clearSpy).toHaveBeenCalled()
  })

  it("applyRequestId should add console transport", () => {
    applyRequestId("requestId")

    expect(addSpy).toHaveBeenCalled()
  })

  it("applyRequestId should add console transport after clearing existing transports", () => {
    applyRequestId("requestId")

    sinon.assert.callOrder(clearSpy, addSpy)
  })
})
