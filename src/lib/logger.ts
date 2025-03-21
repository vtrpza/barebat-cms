type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogData {
  [key: string]: string | number | boolean | null | undefined | LogData;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: LogData;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs: number = 1000;
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: LogData): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  private log(level: LogLevel, message: string, data?: LogData) {
    const logEntry = this.formatMessage(level, message, data);
    this.logs.push(logEntry);

    // Trim logs if they exceed maxLogs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Only log to console in development
    if (this.isDevelopment) {
      const consoleStyle = {
        debug: 'color: #808080',
        info: 'color: #0066cc',
        warn: 'color: #ff9900',
        error: 'color: #cc0000',
      };

      console.log(
        `%c${logEntry.timestamp} [${level.toUpperCase()}] ${message}`,
        consoleStyle[level],
        data || ''
      );
    }
  }

  debug(message: string, data?: LogData) {
    this.log('debug', message, data);
  }

  info(message: string, data?: LogData) {
    this.log('info', message, data);
  }

  warn(message: string, data?: LogData) {
    this.log('warn', message, data);
  }

  error(message: string, data?: LogData) {
    this.log('error', message, data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter((log) => log.level === level);
  }

  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count);
  }
}

export const logger = Logger.getInstance();

interface ErrorInfo {
  componentStack: string;
  [key: string]: unknown;
}

// Error boundary logger
export function logError(error: Error, errorInfo: ErrorInfo) {
  logger.error('React Error Boundary caught an error', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack || '',
    },
    componentStack: errorInfo.componentStack,
  });
}

// Performance logger
export function logPerformance(metricName: string, duration: number) {
  logger.info('Performance Metric', {
    metric: metricName,
    duration: `${duration}ms`,
  });
}

// Navigation logger
export function logNavigation(path: string, query: Record<string, string> = {}) {
  logger.debug('Navigation', {
    path,
    query: JSON.stringify(query),
    timestamp: new Date().toISOString(),
  });
}

// API logger
export function logAPI(method: string, url: string, status: number, duration: number) {
  logger.info('API Call', {
    method,
    url,
    status,
    duration: `${duration}ms`,
  });
} 