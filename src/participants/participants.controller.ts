/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ParticipantsService } from './participants.service';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { createParticipantParams } from 'src/type';
import { EntityManager } from 'typeorm';
import { chatAndUserDto } from './dto/chat-and-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('participants')
@UseGuards(AuthGuard)
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
    private manager: EntityManager,
  ) {}

  @Post('add')
  async create(@Body() createParticipantParams: createParticipantParams) {
    const response = await this.participantsService.create(
      createParticipantParams,
      this.manager,
    );
    return response;
  }
  @Get('chatAndUser')
  async findBy(@Body() chatAndUserDto: chatAndUserDto) {
    const response = await this.participantsService.findBy(chatAndUserDto);
    return response;
  }

  @Get(':id')
  findAll(@Param() id: string) {
    return this.participantsService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }
}
