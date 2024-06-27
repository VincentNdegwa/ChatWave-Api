import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const response = await this.profilesService.create(createProfileDto);
    return response;
  }

  @Get(':user_id')
  async findOne(@Param('user_id') id: string) {
    const response = await this.profilesService.findOne(+id);
    return response;
  }

  @Patch()
  async update(@Body() updateProfileDto: UpdateProfileDto) {
    const response = await this.profilesService.update(updateProfileDto);
    return response;
  }
}
