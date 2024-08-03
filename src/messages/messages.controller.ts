import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const response = await this.messagesService.create(createMessageDto);
    return response;
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const response = await this.messagesService.update(+id, updateMessageDto);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.messagesService.remove(+id);
    return response;
  }

  @Post('read')
  async read(@Body() mesageIds: string[]) {
    const response = await this.messagesService.read(mesageIds);
    return response;
  }
}
