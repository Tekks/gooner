import pino from 'pino';

let logger = pino(
    {
        formatters: {
            level: (label) => { return { level: label }; }
        }
    },
    pino.transport({
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss.l'
        }
    })
);


export class Logger {
    public static info(message: string) { logger.info(message); }
    public static warn(message: string) { logger.warn(message); }
    public static error(message: string) { logger.error(message); }
}