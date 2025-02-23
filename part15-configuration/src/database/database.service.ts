import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private host: string | undefined;
  private port: number | undefined;

  constructor(private configService: ConfigService) {
    this.host = this.configService.get<string>('DATABASE_HOST');
    this.port = this.configService.get<number>('DATABASE_PORT');
  }

  getUri(): string {
    return `mongodb://${this.host}:${this.port}`;
  }
}
