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
    private readonly authRepository: Repository<Auth>,
  ) {}
  async create(userId: any,createProfileDto: CreateProfileDto) {
    const auth = await this.authRepository.findOne(userId);
    if (!auth) {
      throw new NotFoundError('User not found');
    }

    const profile = new Profile();
    profile.fullnames = createProfileDto.fullnames;
    profile.email = createProfileDto.email;
    profile.phoneNo = createProfileDto.phoneNo;
    profile.auth = auth;

    return await this.profileRepository.save(profile);
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
