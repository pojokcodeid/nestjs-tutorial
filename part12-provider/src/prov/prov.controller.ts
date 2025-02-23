import { Controller, Get, Inject } from '@nestjs/common';
import { ProvService } from './prov.service';
import { LoggerService } from './prov.module';

@Controller('prov')
export class ProvController {
  constructor(
    private readonly provService: ProvService,
    @Inject('LoggerService') private readonly logger: LoggerService,
    @Inject('NAMA') private readonly appName: string,
    @Inject('APP_CONFIG') private readonly config: any,
    @Inject('AliasProvService') private readonly alyas: ProvService,
  ) {}

  @Get('log')
  log() {
    this.logger.log('Hello, NestJS!');
  }

  @Get()
  getHello(): string {
    return this.provService.getHello();
  }

  @Get('name')
  getAppName(): string {
    return this.appName;
  }

  @Get('config')
  getAppConfig(): any {
    return this.config;
  }

  @Get('alias')
  getAlias(): any {
    return this.alyas.getHello();
  }
}
