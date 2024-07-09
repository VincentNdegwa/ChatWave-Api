import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.usersService.findAll();
    return response;
  }
  @Get('/all/:id')
  async getOtherUsers(@Param('id') id: string) {
    const response = await this.usersService.getOtherUsers(+id);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.usersService.findOne(+id);
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const response = await this.usersService.update(+id, updateUserDto);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.usersService.remove(+id);
    return response;
  }
}
