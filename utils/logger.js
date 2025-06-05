const { createLogger, format, transports } = require("winston");
const path = require("path");
const fs = require("fs");

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            ),
        }),
        new transports.File({
            filename: path.join(logsDir, "automation.log"),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: logFormat,
        }),
    ],
    // Here you can write error logs into another file if needed
    exceptionHandlers: [
        new transports.File({ filename: path.join(logsDir, "automation.log") })
    ],
    rejectionHandlers: [
        new transports.File({ filename: path.join(logsDir, "automation.log") })
    ]
});

module.exports = logger;