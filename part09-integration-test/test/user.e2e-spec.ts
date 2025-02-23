import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);
  });

  it('/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect({ id: 1, name: 'Alice' });
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'Charlie' })
      .expect(201)
      .expect({ id: 3, name: 'Charlie' });
  });

  it('/user/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .send({ name: 'David' })
      .expect(200)
      .expect({ id: 1, name: 'David' });
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/user/1').expect(200);
  });
});
