import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Response } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @UseGuards(AuthenticatedGuard)
  @Post(':post')
  create(@Param(':post') post,@Request() req,@Body() createLikeDto: CreateLikeDto,@Res() res:Response) {
    return this.likesService.create(req.session.passport.user.userId,post,createLikeDto,res);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
