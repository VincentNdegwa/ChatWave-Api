import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import { UsersService } from 'src/users/users.service';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Verification, InvalidatedToken]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService, UsersService, InvalidatedTokensService],
  exports: [TypeOrmModule],
})
export class ProfilesModule {}
