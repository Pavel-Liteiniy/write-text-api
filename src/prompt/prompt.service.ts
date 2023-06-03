import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionResponse } from 'openai';

import { CreatePromptDto } from './dto/create-prompt.dto';

@Injectable()
export class PromptService {
  private static instance: OpenAIApi;

  private static getInstance(): OpenAIApi {
    if (!PromptService.instance) {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      PromptService.instance = new OpenAIApi(configuration);
    }

    return PromptService.instance;
  }

  private static async getCompletion({
    prompt,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  }: CreatePromptDto): Promise<CreateCompletionResponse> {
    const openAi = PromptService.getInstance();

    const response = await openAi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
    });

    return response.data;
  }

  create(createOpenAiDto: CreatePromptDto) {
    return PromptService.getCompletion(createOpenAiDto);
  }
}
