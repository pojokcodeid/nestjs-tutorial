import { Injectable } from '@nestjs/common';
import { CommondService } from 'src/commond/commond.service';

@Injectable()
export class OtherService {
  constructor(private readonly commonService: CommondService) {}

  useCommonService(): string {
    return this.commonService.getHello();
  }
}
