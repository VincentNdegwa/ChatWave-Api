import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InvalidatedTokensService } from './invalidated-tokens.service';
import { CreateInvalidatedTokenDto } from './dto/create-invalidated-token.dto';

@Controller('invalidated-tokens')
export class InvalidatedTokensController {
  constructor(
    private readonly invalidatedTokensService: InvalidatedTokensService,
  ) {}

  @Post()
  create(@Body() createInvalidatedTokenDto: CreateInvalidatedTokenDto) {
    return this.invalidatedTokensService.create(createInvalidatedTokenDto);
  }

  @Get()
  findAll() {
    return this.invalidatedTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invalidatedTokensService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invalidatedTokensService.remove(+id);
  }
}
