import { Injectable, Scope } from '@nestjs/common';

// @Injectable()
// @Injectable({ scope: Scope.REQUEST })
@Injectable({ scope: Scope.TRANSIENT })
export class ProvService {
  getHello(): string {
    return 'Hello, NestJS!';
  }
}
