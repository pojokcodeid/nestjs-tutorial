import { Module } from '@nestjs/common';
import { ProvService } from './prov.service';
import { ProvController } from './prov.controller';

export class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

@Module({
  providers: [
    // contoh Standard providers
    ProvService,
    // contoh Class provider
    {
      provide: 'LoggerService',
      useClass: LoggerService,
    },
    // conoth value provider
    {
      provide: 'NAMA',
      useValue: 'NestJS',
    },
    // Factory Provider
    {
      provide: 'APP_CONFIG',
      useFactory: () => {
        return {
          appName: 'MyNestApp',
          version: '1.0.0',
        };
      },
    },
    // Alias (Use Existing) Provider
    {
      provide: 'AliasProvService',
      useExisting: ProvService,
    },
  ],
  controllers: [ProvController],
})
export class ProvModule {}
