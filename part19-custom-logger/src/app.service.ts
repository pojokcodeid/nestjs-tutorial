import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name); // Inisialisasi logger
  getHello(): string {
    this.logger.log('getHello() dipanggil'); // Log info
    this.logger.warn('Ini adalah peringatan'); // Log warning
    return 'Hello World!';
  }
}
