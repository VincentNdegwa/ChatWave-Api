import { Injectable } from '@nestjs/common';
import { createUserParams, updateUserParams } from 'src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async create(userDetails: createUserParams) {
    try {
      const hashedPassword = await this.HashPasword(userDetails.password);
      const newUser = this.userRepository.create({
        ...userDetails,
        password: hashedPassword,
        created_at: new Date(),
      });
      const user = await this.userRepository.save(newUser);
      return { error: false, message: 'User added!', data: user };
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['profile', 'verification'],
      });
      return { error: false, message: 'Users retrieved!', data: users };
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['profile', 'verification'],
      });
      if (user) {
        return { error: false, message: 'User found!', data: user };
      } else {
        return { error: true, message: 'User not found', data: null };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async update(id: number, userDetails: updateUserParams) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      const comparePass = await this.ComparePassword(
        userDetails.old_password,
        user.password,
      );
      if (user && comparePass) {
        const updatedUser = await this.userRepository.update(id, {
          password: await this.HashPasword(userDetails.new_password),
          updated_at: new Date(),
        });
        return { error: false, message: 'User updated', data: updatedUser };
      } else {
        return {
          error: true,
          message: 'Old password is incorrect or user not found',
          data: null,
        };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected) {
        return { error: false, message: 'User deleted', data: result };
      } else {
        return { error: true, message: 'User not found', data: null };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }
  async getOtherUsers(id: number) {
    const users = await this.userRepository.find({
      where: { id: Not(id) },
      relations: ['profile'],
    });
    if (users) {
      return { error: false, message: 'Users fetched', data: users };
    } else {
      return { error: true, message: 'Users not found', data: null };
    }
  }
}
