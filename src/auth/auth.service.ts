import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { hashPassword, } from 'src/utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRespository:Repository<Auth>
  ){}
  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.authRespository.findOne({ where: { username: createAuthDto.username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await hashPassword(createAuthDto.password); // Assuming hashPassword is an async function

    // Step 3: Save the new user to the database
    const newUser = this.authRespository.create({
      username: createAuthDto.username,
      password: hashedPassword,
      role: createAuthDto.role,
    });
    return await this.authRespository.save(newUser);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
