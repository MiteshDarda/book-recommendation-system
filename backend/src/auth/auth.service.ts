import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/api/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LogInDto } from './dto/log-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //* ------------------------------------------- REGISTER -------------------------------------------
  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = new User();
    user.name = registerDto.name;
    user.email = registerDto.email;
    user.password = hashedPassword;
    try {
      const saveRes = await this.userRepository
        .createQueryBuilder('user')
        .insert()
        .values(user)
        .execute();
      console.log(saveRes);
      if (saveRes) return { message: 'User Registered Successfully' };
    } catch (err) {
      if (err?.code === '23505') {
        throw new HttpException('Email Already Exists', HttpStatus.FORBIDDEN);
      }
      console.log(err);
      throw err;
    }
  }

  //* ------------------------------------------- LOGIN -------------------------------------------
  async login(loginDto: LogInDto) {
    const user = await this.userService.getOne(loginDto.email);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return {
      token: this.jwtService.sign({ id: user.id, name: user.name }),
    };
  }
}
