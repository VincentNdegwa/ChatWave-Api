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
import { ChatsService } from './chats.service';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create')
  async create(@Body() createChatDto: CreateChatDto) {
    const response = await this.chatsService.create(createChatDto);
    return response;
  }

  @Get('user/:userId')
  async getUserChats(@Param('userId') userId: string) {
    const response = await this.chatsService.getUserChats(+userId);
    return response;
  }

  @Get('single/:id')
  async getChatOnly(@Param('id') id: string) {
    const response = await this.chatsService.getChatOnly(+id);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.chatsService.findOne(+id);
    return response;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
