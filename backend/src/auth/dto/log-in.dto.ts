import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  NotContains,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  @NotContains(' ', { message: 'Password must not contain spaces' })
  readonly password: string;
}
