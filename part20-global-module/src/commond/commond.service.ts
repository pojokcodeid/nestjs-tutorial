import { Injectable } from '@nestjs/common';

@Injectable()
export class CommondService {
  getHello(): string {
    return 'Hello from CommonService!';
  }
}
