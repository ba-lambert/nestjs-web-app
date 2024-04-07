import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}
  async create(userId: any,createProfileDto: CreateProfileDto) {
    const userProfile = await this.profileRepository.findOne({
      where: { authId: userId }, // you can now use `authId` directly
    });
    
    
    console.log(userId);
    
    
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
