import { UseFilters, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import axios from 'axios';
import { CreateCompletionResponse } from 'openai';

import { WsExceptionFilter } from '../filters/ws-exception.filter';

import { WsThrottlerGuard } from '../guards/WsThrottlerGuard';

import { PromptService } from './prompt.service';

const PROMPT_PREFIX = 'Complete the following text: ';
const TEMPERATURE = 0.9;
const MAX_TOKENS = 300;
const TOP_P = 1;
const FREQUENCY_PENALTY = 0.0;
const PRESENCE_PENALTY = 0.6;

@WebSocketGateway(4000, {
  cors: { origin: ['http://localhost:3000', 'http://localhost:3001'] },
})
@UseFilters(WsExceptionFilter)
export class PromptGateway {
  constructor(private readonly promptService: PromptService) {}

  @UseGuards(WsThrottlerGuard)
  @SubscribeMessage('createPrompt')
  async create(
    @MessageBody('text') text: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const completion = await this.promptService.create({
        prompt: PROMPT_PREFIX + text.trim(),
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        top_p: TOP_P,
        frequency_penalty: FREQUENCY_PENALTY,
        presence_penalty: PRESENCE_PENALTY,
      });

      if (!completion?.choices[0]?.text) {
        throw new WsException('No choices found');
      }

      client.emit('promptCreated', {
        status: 'success',
        prompt: completion.choices[0].text.trim(),
      });
    } catch (error) {
      if (axios.isAxiosError<CreateCompletionResponse>(error)) {
        throw new WsException('Something went wrong');
      } else if (error instanceof WsException) {
        throw new WsException(error.message);
      }

      throw new WsException('Something went wrong');
    }
  }
}
