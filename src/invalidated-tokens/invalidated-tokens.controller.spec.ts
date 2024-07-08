import { Test, TestingModule } from '@nestjs/testing';
import { InvalidatedTokensController } from './invalidated-tokens.controller';
import { InvalidatedTokensService } from './invalidated-tokens.service';

describe('InvalidatedTokensController', () => {
  let controller: InvalidatedTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvalidatedTokensController],
      providers: [InvalidatedTokensService],
    }).compile();

    controller = module.get<InvalidatedTokensController>(InvalidatedTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
