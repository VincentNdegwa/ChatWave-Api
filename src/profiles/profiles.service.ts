import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { createProfileParams, updateProfileParams } from 'src/type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private userService: UsersService,
  ) {}

  async create(createProfileParams: createProfileParams) {
    const { user_id, ...profileDetails } = createProfileParams;

    const { data } = await this.userService.findOne(user_id);
    const user = data;

    if (!user) {
      return { error: true, message: 'User not found' };
    }

    if (user.profile) {
      return { error: true, message: 'User already has a profile' };
    }

    const profile = this.profileRepository.create({
      ...profileDetails,
      created_at: new Date(),
    });
    const savedProfile = await this.profileRepository.save(profile);

    user.profile = savedProfile;
    await this.userRepository.save(user);

    return {
      error: false,
      message: 'Profile created successfully',
      data: savedProfile,
    };
  }

  async findOne(user_id: number) {
    const { data } = await this.userService.findOne(user_id);
    if (!data) {
      return { error: true, message: 'User not found' };
    } else {
      const profile = data.profile;
      if (!profile) {
        return { error: true, message: 'User does not have a profile' };
      } else {
        return { error: false, message: 'Profile found', data: profile };
      }
    }
  }

  async update(updateProfileParams: updateProfileParams) {
    const { user_id, ...otherData } = updateProfileParams;
    const { data } = await this.userService.findOne(user_id);
    const user = data;
    if (!user) {
      return { error: true, message: 'User not found' };
    }
    if (!user.profile) {
      const userProfile = this.create(updateProfileParams);
      return userProfile;
    }
    const profile = user.profile;
    await this.profileRepository.update(profile.id, {
      ...otherData,
      updated_at: new Date(),
    });
    const updateUser = await this.findOne(user_id);
    return updateUser;
  }
}
