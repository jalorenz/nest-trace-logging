
# Nest.js Traceability enhanced Logging Module

This Nest.js (https://nestjs.com/) Module provides a Logger built on top of Winston (https://www.npmjs.com/package/winston) which is enhances with a unique Request ID when called in a HTTP context.

## Installation

`npm install nest-trace-logging`

## Example

Initialize module:

```ts

import { Module} from "@nestjs/common"
import { LoggingModule } from "nest-trace-logging";

@Module({
    imports: [LoggingModule],
})
class ExampleModule {}
```

Usage of provider logger (HTTP context):

```ts
import { Controller } from "@nestjs/common"
import { Logger } from "nest-trace-logging"

@Controller("foo")
class ExampleController {
    
    @Get("bar")
    someMethod() {
        Logger.debug("Some debug info ...")
    }
}
```

Result:

```
...
[debug] [2020-02-20T18:00:00.000Z] (RequestId=fe0dfdb4-3bca-41b7-8cfd-56d659579dea) Some debug info ...
...
```

Usage of provider logger (no HTTP context):

```ts
import { Logger } from "nest-trace-logging"

class ExampleService {   
    someMethod() {
        Logger.debug("Some other debug info ...")
    }
}
```

Result:

```
...
[debug] [2020-02-20T18:00:00.000Z] Some other debug info ...
...
```