import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session = require('express-session');
import passport = require('passport');

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
  await app.listen(3000);
}
bootstrap();
