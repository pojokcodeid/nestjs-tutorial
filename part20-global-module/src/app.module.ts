import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommondModule } from './commond/commond.module';
import { OtherModule } from './other/other.module';

@Module({
  imports: [CommondModule, OtherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
