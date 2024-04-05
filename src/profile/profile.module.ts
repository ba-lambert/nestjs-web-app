import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Profile]),TypeOrmModule.forFeature([Auth])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
