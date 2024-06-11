import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/api/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/api/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/user/entities/user.entity';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      global: true,
      signOptions: { expiresIn: process.env.JWT_EXP || '5m' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AuthGuard],
})
export class AuthModule {}
