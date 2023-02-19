import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { loggerProxy } from "../platform/logger-proxy"

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = uuidv4()
        res.setHeader("X-Request-Id", requestId)
        return loggerProxy(requestId, next)
    }
}