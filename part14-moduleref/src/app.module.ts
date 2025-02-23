import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [ReferenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
