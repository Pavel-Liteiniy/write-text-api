import { IsString, IsNumber } from 'class-validator';

export class CreatePromptDto {
  @IsString()
  prompt: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  max_tokens: number;

  @IsNumber()
  top_p: number;

  @IsNumber()
  frequency_penalty: number;

  @IsNumber()
  presence_penalty: number;
}
