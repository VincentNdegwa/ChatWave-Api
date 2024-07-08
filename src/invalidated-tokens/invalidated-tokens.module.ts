import { Module } from '@nestjs/common';
import { InvalidatedTokensService } from './invalidated-tokens.service';
import { InvalidatedTokensController } from './invalidated-tokens.controller';

@Module({
  controllers: [InvalidatedTokensController],
  providers: [InvalidatedTokensService],
})
export class InvalidatedTokensModule {}
