import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import isNil from 'lodash/isNil';

import { OpenAiService } from './open-ai.service';
import { CreateOpenAiDto } from './dto/create-open-ai.dto';
import { UpdateOpenAiDto } from './dto/update-open-ai.dto';

const PROMPT_PREFIX = 'Complete the following text: ';
const TEMPERATURE = 0.9;
const MAX_TOKENS = 150;
const TOP_P = 1;
const FREQUENCY_PENALTY = 0.0;
const PRESENCE_PENALTY = 0.6;

@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  async create(@Body() { text }: { text: string }) {
    const completion = await this.openAiService.create({
      prompt: PROMPT_PREFIX + text.trim(),
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      top_p: TOP_P,
      frequency_penalty: FREQUENCY_PENALTY,
      presence_penalty: PRESENCE_PENALTY,
    });

    if (isNil(completion?.choices[0]?.text)) {
      throw new Error('No choices found');
    }

    return {
      prompt: completion.choices[0].text.trim(),
    };
  }

  @Get()
  findAll() {
    return this.openAiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.openAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpenAiDto: UpdateOpenAiDto) {
    return this.openAiService.update(+id, updateOpenAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.openAiService.remove(+id);
  }
}
