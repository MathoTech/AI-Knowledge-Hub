import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ask (POST)', () => {
    return request(app.getHttpServer())
      .post('/ask')
      .send({ question: 'Hello how are you doing?' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('question', 'Hello how are you doing?');
        expect(res.body).toHaveProperty('answer');
        expect(typeof res.body.answer).toBe('string');
      });
  });
  
});