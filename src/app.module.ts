import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, OpenAiModule, PromptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
