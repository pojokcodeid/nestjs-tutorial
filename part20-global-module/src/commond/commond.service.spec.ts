import { Test, TestingModule } from '@nestjs/testing';
import { CommondService } from './commond.service';

describe('CommondService', () => {
  let service: CommondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommondService],
    }).compile();

    service = module.get<CommondService>(CommondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
