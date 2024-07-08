import { PartialType } from '@nestjs/mapped-types';
import { CreateInvalidatedTokenDto } from './create-invalidated-token.dto';

export class UpdateInvalidatedTokenDto extends PartialType(CreateInvalidatedTokenDto) {}
