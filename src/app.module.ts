import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { UsersModule } from './users/users.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    UsersModule,
    OpenAiModule,
    PromptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
