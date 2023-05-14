import { Injectable } from '@nestjs/common';

import { Configuration, OpenAIApi, CreateCompletionResponse } from 'openai';

import { CreateOpenAiDto } from './dto/create-open-ai.dto';
import { UpdateOpenAiDto } from './dto/update-open-ai.dto';

@Injectable()
export class OpenAiService {
  private static instance: OpenAIApi;

  private static getInstance(): OpenAIApi {
    if (!OpenAiService.instance) {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      OpenAiService.instance = new OpenAIApi(configuration);
    }

    return OpenAiService.instance;
  }

  private static async getCompletion({
    prompt,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  }: CreateOpenAiDto): Promise<CreateCompletionResponse> {
    const openAi = OpenAiService.getInstance();

    try {
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  create(createOpenAiDto: CreateOpenAiDto) {
    return OpenAiService.getCompletion(createOpenAiDto);
  }

  findAll() {
    return `This action returns all openAi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openAi`;
  }

  update(id: number, updateOpenAiDto: UpdateOpenAiDto) {
    return `This action updates a #${id} openAi`;
  }

  remove(id: number) {
    return `This action removes a #${id} openAi`;
  }
}
