import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Level log yang ditampilkan (info, warn, error, debug, dll.)
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({
            timestamp,
            level,
            stack,
            message,
          }: {
            timestamp?: string;
            level: string;
            stack?: string;
            message: string;
          }) => {
            return `${timestamp || ''} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`;
          },
        ),
      ),
      transports: [
        new winston.transports.Console(), // Logging ke console

        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD', // Buat file log baru setiap hari
          zippedArchive: true, // Arsipkan file lama dalam format zip
          maxSize: '20m', // Ukuran maksimal file sebelum rotasi
          maxFiles: '14d', // Simpan log selama 14 hari
        }),

        new winston.transports.DailyRotateFile({
          filename: 'logs/errors-%DATE%.log',
          level: 'error', // Hanya error yang akan disimpan di file ini
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - TRACE: ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
