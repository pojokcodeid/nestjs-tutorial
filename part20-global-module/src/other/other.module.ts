import { Module } from '@nestjs/common';
import { OtherService } from './other.service';
import { OtherController } from './other.controller';

@Module({
  providers: [OtherService],
  controllers: [OtherController],
})
export class OtherModule {}
