import { Injectable } from '@nestjs/common';

@Injectable()
export class ReferenceService {
  getData(): string {
    return 'Data from Reference Service';
  }
}
