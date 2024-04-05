import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './localstratefy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]),PassportModule.register({session:true})],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,SessionSerializer],
})
export class AuthModule {}
