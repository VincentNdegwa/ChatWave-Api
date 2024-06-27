import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Verification]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
