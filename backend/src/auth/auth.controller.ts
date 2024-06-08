import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LogInDto } from './dto/log-in.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* ------------------------------------------- REGISTER -------------------------------------------
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  //* ------------------------------------------- LOGIN -------------------------------------------
  @Post('login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  //* ------------------------------------------- VERIFY -------------------------------------------
  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@Req() request: Request) {
    return this.authService.verify(request['userId']);
  }
}
