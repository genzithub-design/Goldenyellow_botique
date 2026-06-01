const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.join(__dirname, 'logs');
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, 'server.log');

function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
}

function writeToFile(formattedMsg) {
  fs.appendFile(logFile, formattedMsg + '\n', (err) => {
    if (err) {
      console.error('Failed to write log to file:', err);
    }
  });
}

const colors = {
  reset: '\x1b[0m',
  info: '\x1b[36m',    // Cyan
  warn: '\x1b[33m',    // Yellow
  error: '\x1b[31m',   // Red
  success: '\x1b[32m'  // Green
};

const logger = {
  info: (msg) => {
    const formatted = formatMessage('info', msg);
    console.log(`${colors.info}${formatted}${colors.reset}`);
    writeToFile(formatted);
  },
  warn: (msg) => {
    const formatted = formatMessage('warn', msg);
    console.warn(`${colors.warn}${formatted}${colors.reset}`);
    writeToFile(formatted);
  },
  error: (msg, err) => {
    let fullMsg = msg;
    if (err) {
      fullMsg += ` - ${err.stack || err.message || err}`;
    }
    const formatted = formatMessage('error', fullMsg);
    console.error(`${colors.error}${formatted}${colors.reset}`);
    writeToFile(formatted);
  },
  success: (msg) => {
    const formatted = formatMessage('success', msg);
    console.log(`${colors.success}${formatted}${colors.reset}`);
    writeToFile(formatted);
  }
};

module.exports = logger;
