import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LogInDto } from './dto/log-in.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* ------------------------------------------- REGISTER -------------------------------------------
  @ApiOperation({ summary: 'Registers New User' })
  @ApiBody({
    type: RegisterDto,
    description: 'Register User',
    required: true,
    examples: {
      mitesh: {
        value: {
          name: 'mitesh',
          email: 'mitesh@example.com',
          password: '11@@qqAA',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: `{ message: 'User Registered Successfully' }`,
  })
  @ApiResponse({ status: 403, description: 'Email Already Exists' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  //* ------------------------------------------- LOGIN -------------------------------------------
  @ApiOperation({ summary: 'Login Api' })
  @ApiBody({
    type: RegisterDto,
    description: 'User Login',
    required: true,
    examples: {
      mitesh: {
        value: {
          email: 'mitesh@example.com',
          password: '11@@qqAA',
        },
      },
    },
  })
  @Post('login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  //* ------------------------------------------- VERIFY -------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Validate User/Jwt' })
  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@Req() request: Request) {
    return this.authService.verify(request['userId']);
  }
}
