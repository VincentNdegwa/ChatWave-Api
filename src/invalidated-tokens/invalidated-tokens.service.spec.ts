import { Test, TestingModule } from '@nestjs/testing';
import { InvalidatedTokensService } from './invalidated-tokens.service';

describe('InvalidatedTokensService', () => {
  let service: InvalidatedTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvalidatedTokensService],
    }).compile();

    service = module.get<InvalidatedTokensService>(InvalidatedTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
