import { Test, TestingModule } from '@nestjs/testing';
import { PromptGateway } from './prompt.gateway';
import { PromptService } from './prompt.service';

describe('PromptGateway', () => {
  let gateway: PromptGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptGateway, PromptService],
    }).compile();

    gateway = module.get<PromptGateway>(PromptGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
