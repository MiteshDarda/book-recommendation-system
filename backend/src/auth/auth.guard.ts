import {
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/api/user/user.service';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    try {
      const request = context.switchToHttp().getRequest();
      const authToken = request.headers['authorization'];
      const token = authToken.split(' ')[1];
      const decodedToken = await this.authService.decode(token);

      if (!decodedToken) return false;
      if (decodedToken.exp < Date.now() / 1000) return false;

      const user = await this.userService.getOneById(decodedToken.id);
      request.userId = decodedToken.id;

      if (!user) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
