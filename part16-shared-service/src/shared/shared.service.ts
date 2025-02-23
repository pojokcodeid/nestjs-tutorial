import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  getHelloMessage(): string {
    return 'Hello from Shared Service!';
  }
}
