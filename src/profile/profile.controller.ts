import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Request } from '@nestjs/common';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Request() req, @Body() createProfileDto: CreateProfileDto) {    
    return this.profileService.create(req.session.passport.user.userId,createProfileDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.profileService.findAll(req.session.passport.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
