import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
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
  logoutUser(@Req() req) {
    const token = req.headers.authorization.split('')[1];
    return this.authService.logoutUser(token);
  }
}
