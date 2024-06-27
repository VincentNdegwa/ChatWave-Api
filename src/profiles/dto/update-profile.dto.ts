import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  user_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
  about: string;
}
