import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Membuat modul ini tersedia secara global
    }),
    // Modul lain yang ingin Anda impor
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
