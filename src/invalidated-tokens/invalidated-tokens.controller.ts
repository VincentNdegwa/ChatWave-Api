import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { InvalidatedTokensService } from './invalidated-tokens.service';
import { CreateInvalidatedTokenDto } from './dto/create-invalidated-token.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('invalidated-tokens')
@UseGuards(AuthGuard)
export class InvalidatedTokensController {
  constructor(
    private readonly invalidatedTokensService: InvalidatedTokensService,
  ) {}

  @Post()
  async create(@Body() createInvalidatedTokenDto: CreateInvalidatedTokenDto) {
    const response = await this.invalidatedTokensService.create({
      token: createInvalidatedTokenDto.token,
      created_at: new Date(),
    });
    return response;
  }
  @Post()
  async findOne(token: string) {
    const response = this.invalidatedTokensService.findOne(token);
    return response;
  }
}
