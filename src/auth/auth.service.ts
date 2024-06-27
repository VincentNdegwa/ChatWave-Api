import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserParams } from 'src/type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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
    const user = await this.userRepository.findOne({
      where: { phone_number: userDetails.phone_number },
    });
    if (user) {
      const isMatch = await this.ComparePassword(
        userDetails.password,
        user.password,
      );
      if (isMatch) {
        const payload = { sub: user.id, phone_number: user.phone_number };
        return {
          accessToken: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
  catch(error) {
    return { error: true, message: error.message, data: null };
  }

  async logoutUser() {
    return `This action returns all auth`;
  }
}
