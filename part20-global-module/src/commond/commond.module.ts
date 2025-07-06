import { Global, Module } from '@nestjs/common';
import { CommondService } from './commond.service';

@Global()
@Module({
  providers: [CommondService],
  exports: [CommondService],
})
export class CommondModule {}
