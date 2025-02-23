import { Module } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';

@Module({
  providers: [ReferenceService],
  controllers: [ReferenceController],
})
export class ReferenceModule {}
