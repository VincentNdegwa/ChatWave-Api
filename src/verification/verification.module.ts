import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvalidatedToken])],
  controllers: [VerificationController],
  providers: [VerificationService, InvalidatedTokensService],
})
export class VerificationModule {}
