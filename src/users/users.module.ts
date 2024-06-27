import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Verification])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
