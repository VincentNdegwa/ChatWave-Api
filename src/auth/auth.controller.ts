import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { phoneAuthenticateDto } from './dto/phone-authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.loginUser(createUserDto);
  }

  @Post('/phone-number')
  async authenticateNumber(@Body() phoneAuthDto: phoneAuthenticateDto) {
    const response = await this.authService.authenticateNumber(phoneAuthDto);
    return response;
  }
  @UseGuards(AuthGuard)
  @Post('/logout')
  logoutUser() {
    return this.authService.logoutUser();
  }
}
