# Utils

Small functions that help us with problems

## Logger

The logger has been building with winston.js .

### LogLevels

1. Info
2. Warn
3. Error
4. Debug

### Options

In the `.env` file you can change

```
LOG_LEVEL=debug
```

to any other loglevel

### Import

```ts
import logger from '[navigate to "server"]/utils/logger'
```

**Make Sure you have just compiled the ts-files**

### Use

After an Import the logger is extreamly easy to handle.

#### Info Log

```ts
import logger from 'server/utils/logger'

logger.info('This is an Info!')
logger.log('info', 'This is an Info too')
```
#### Warn Log

```ts
import logger from 'server/utils/logger'

logger.warn('This is a warn')
logger.log('warn','This is a warn too')
```
#### Error Log

```ts
import logger from 'server/utils/logger'

logger.error('This is a error')
logger.log('error','This is a error too')
```

#### Debug Log

```ts
import logger from 'server/utils/logger'

logger.debug('This is a debug')
logger.log('debug','This is a debug too')
```
