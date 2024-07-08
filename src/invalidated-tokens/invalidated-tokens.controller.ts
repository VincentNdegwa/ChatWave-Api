import { Controller, Post, Body } from '@nestjs/common';
import { InvalidatedTokensService } from './invalidated-tokens.service';
import { CreateInvalidatedTokenDto } from './dto/create-invalidated-token.dto';

@Controller('invalidated-tokens')
export class InvalidatedTokensController {
  constructor(
    private readonly invalidatedTokensService: InvalidatedTokensService,
  ) {}

  @Post()
  async create(@Body() createInvalidatedTokenDto: CreateInvalidatedTokenDto) {
    const response = await this.invalidatedTokensService.create(
      createInvalidatedTokenDto,
    );
    return response;
  }
  @Post()
  async findOne(token: string) {
    const response = this.invalidatedTokensService.findOne(token);
    return response;
  }
}
