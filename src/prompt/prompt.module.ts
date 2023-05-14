import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptGateway } from './prompt.gateway';

@Module({
  providers: [PromptGateway, PromptService],
})
export class PromptModule {}
