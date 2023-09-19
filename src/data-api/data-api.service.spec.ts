import { Test, TestingModule } from '@nestjs/testing';
import { DataApiService } from './data-api.service';

describe('DataApiService', () => {
  let service: DataApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataApiService],
    }).compile();

    service = module.get<DataApiService>(DataApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
