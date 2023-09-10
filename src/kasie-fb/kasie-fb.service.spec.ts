import { Test, TestingModule } from '@nestjs/testing';
import { KasieFbService } from './kasie-fb.service';

describe('KasieFbService', () => {
  let service: KasieFbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KasieFbService],
    }).compile();

    service = module.get<KasieFbService>(KasieFbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
