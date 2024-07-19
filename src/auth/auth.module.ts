import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Verification, InvalidatedToken]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, InvalidatedTokensService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
