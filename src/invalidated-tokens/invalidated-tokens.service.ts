import { Injectable } from '@nestjs/common';
import { CreateInvalidatedTokenDto } from './dto/create-invalidated-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvalidatedToken } from './entities/invalidated-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvalidatedTokensService {
  constructor(
    @InjectRepository(InvalidatedToken)
    private invalidatedTokenRepository: Repository<InvalidatedToken>,
  ) {}
  async create(createInvalidatedTokenDto: CreateInvalidatedTokenDto) {
    try {
      const invalidatedToken = await this.invalidatedTokenRepository.create(
        createInvalidatedTokenDto,
      );
      if (invalidatedToken) {
        return { error: false, message: 'User logged out', data: null };
      } else {
        return { error: true, message: 'Failed to logout', data: null };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async findOne(token: string) {
    try {
      const expiredToken = await this.invalidatedTokenRepository.findOneBy({
        token: token,
      });
      if (expiredToken) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
