import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from './create-participant.dto';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  id: number;
  text: string;
  sender_id: number;
}
