import { Injectable } from '@nestjs/common';
import { CreateInvalidatedTokenDto } from './dto/create-invalidated-token.dto';
import { UpdateInvalidatedTokenDto } from './dto/update-invalidated-token.dto';

@Injectable()
export class InvalidatedTokensService {
  create(createInvalidatedTokenDto: CreateInvalidatedTokenDto) {
    return 'This action adds a new invalidatedToken';
  }

  findAll() {
    return `This action returns all invalidatedTokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invalidatedToken`;
  }

  update(id: number, updateInvalidatedTokenDto: UpdateInvalidatedTokenDto) {
    return `This action updates a #${id} invalidatedToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} invalidatedToken`;
  }
}
