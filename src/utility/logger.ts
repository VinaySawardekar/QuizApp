import { createLogger, transports, format } from "winston";
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

/**
 * Custom Logger for the system.
 * @description
 * It logs a message to the console.
 * when using customLogger, we need to pass type of log {info, warn, error} and message.
 * Example: customLogger.log('info', 'message');
 *
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const customLogger = createLogger({
  level: "debug",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    myFormat,
  ),
  transports: [new transports.Console()],
});

export default customLogger;
