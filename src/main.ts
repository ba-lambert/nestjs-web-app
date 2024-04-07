import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import passport = require('passport');
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret:'keyboard',
      resave:false,
      saveUninitialized:false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT);
}
bootstrap();
