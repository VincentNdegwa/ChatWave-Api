import { Module } from '@nestjs/common';
import { InvalidatedTokensService } from './invalidated-tokens.service';
import { InvalidatedTokensController } from './invalidated-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvalidatedToken } from './entities/invalidated-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvalidatedToken])],
  controllers: [InvalidatedTokensController],
  providers: [InvalidatedTokensService],
  exports: [InvalidatedTokensService],
})
export class InvalidatedTokensModule {}
