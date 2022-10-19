import { format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';


const levels = {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3
}

const logger = createLogger({
    levels: levels,
    level: process.env.LOG_LEVEL || 'debug',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({
                  format: 'YYYY-MM-DD hh:mm:ss A',
                }),
                format.align(),
                format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            ),
        }),
        new transports.DailyRotateFile({
            format: format.combine(format.timestamp(), format.json()),
            filename: './logs/log-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d'
        })
    ]
})

export default logger