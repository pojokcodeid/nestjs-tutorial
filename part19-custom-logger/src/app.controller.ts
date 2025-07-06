import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLogger } from './logger.service';

@Controller()
export class AppController {
  // private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly logger: AppLogger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.debug('Memanggil endpoint GET /');
    this.logger.log('getHello() dipanggil');
    this.logger.warn('Peringatan: Ini contoh warning');
    return this.appService.getHello();
  }
}
