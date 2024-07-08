import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserParams } from 'src/type';
import { JwtService } from '@nestjs/jwt';
import { phoneAuthenticateDto } from './dto/phone-authenticate.dto';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private invalidateTokenService: InvalidatedTokensService,
  ) {}
  private async HashPasword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async ComparePassword(
    password: string,
    hashString: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashString);
  }
  async loginUser(userDetails: createUserParams) {
    try {
      const user = await this.userRepository.findOne({
        where: { phone_number: userDetails.phone_number },
        relations: ['profile'],
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await this.ComparePassword(
        userDetails.password,
        user.password,
      );
      if (!isMatch) {
        throw new HttpException(
          "Password didn't match",
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = { sub: user.id, phone_number: user.phone_number };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        userId: user.id,
        user: user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async authenticateNumber(phoneAuthenticateDto: phoneAuthenticateDto) {
    const user = await this.userRepository.findOne({
      where: { phone_number: phoneAuthenticateDto.phone },
    });
    if (user) {
      return { error: false, message: 'Phone number exists', data: null };
    } else {
      return {
        error: true,
        message: 'Phone number does not exist',
        data: user,
      };
    }
  }

  async logoutUser(token: string) {
    console.log(token);
    const { message } = await this.invalidateTokenService.create({
      token: token,
      created_at: new Date(),
    });
    throw new UnauthorizedException(message);
  }
}
