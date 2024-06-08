import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { allEntities } from './database/all_entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './api/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      global: true,
      signOptions: { expiresIn: process.env.JWT_EXP || '5m' },
    }),
    TypeOrmModule.forFeature(allEntities),
    DatabaseModule,
    UserModule,
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
