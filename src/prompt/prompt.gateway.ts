import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';

@WebSocketGateway()
export class PromptGateway {
  constructor(private readonly promptService: PromptService) {}

  @SubscribeMessage('createPrompt')
  create(@MessageBody() createPromptDto: CreatePromptDto) {
    return this.promptService.create(createPromptDto);
  }

  @SubscribeMessage('findAllPrompt')
  findAll() {
    return this.promptService.findAll();
  }

  @SubscribeMessage('findOnePrompt')
  findOne(@MessageBody() id: number) {
    return this.promptService.findOne(id);
  }

  @SubscribeMessage('updatePrompt')
  update(@MessageBody() updatePromptDto: UpdatePromptDto) {
    return this.promptService.update(updatePromptDto.id, updatePromptDto);
  }

  @SubscribeMessage('removePrompt')
  remove(@MessageBody() id: number) {
    return this.promptService.remove(id);
  }
}
