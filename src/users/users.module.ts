import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Verification, InvalidatedToken]),
  ],
  controllers: [UsersController],
  providers: [UsersService, InvalidatedTokensService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
