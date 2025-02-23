import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedService } from './shared/shared.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sharedService: SharedService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('shared')
  getSharedHello(): string {
    return this.sharedService.getHelloMessage();
  }
}
