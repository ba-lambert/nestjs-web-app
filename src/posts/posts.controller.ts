import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto,@Request() req) {
    return this.postsService.create(createPostDto,req.session.passport.userId);
  }
  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll(@Request() req,@Res() res:Response) {
    return this.postsService.findAll(req.session.passport.userId,res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
