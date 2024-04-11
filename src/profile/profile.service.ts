import { HttpStatus, Injectable,NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}
  async create(userId: any,createProfileDto: CreateProfileDto) {
    let userProfile = await this.profileRepository.findOne({
      where: { authId: userId },
    });
  
    if (!userProfile) {
      userProfile = this.profileRepository.create({
        ...createProfileDto,
        auth: { id: userId },
      });
      await this.profileRepository.save(userProfile);
    } else {
    }
  
    return userProfile;
    
  }

  async findAll(userId:string,res:any) {
    try{
      let myProfile = await this.profileRepository.findOne({where:{authId:userId}})
      if(!myProfile){
        return new NotFoundException('You have not created your profile')
      }
      let authData = await this.authRepository.findOne({where:{id:userId}})
      return res.status(HttpStatus.ACCEPTED).json({profile:{
        username:authData.username,
        role:authData.role,
        fullnames:myProfile.fullnames,
        email:myProfile.email,
        phoneNo:myProfile.phoneNo,
      },});
    }catch(err){
      res.status(HttpStatus.BAD_GATEWAY).json({message:err})
    }
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
