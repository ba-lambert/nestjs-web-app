import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }
  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(req.session.passport.user.userId, createPostDto);
  }
  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll(@Request() req, @Res() res: Response) {
    return this.postsService.findAll(req.session.passport.user.userId, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Request()req,@Res() res:Response) {
    return this.postsService.findOne(req.session.passport.user.userId,id,res);
  }
  @UseGuards(AuthenticatedGuard)
  @Patch(':postId')
  update(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto, @Request() req, @Res() res:Response) {
    return this.postsService.update(req.session.passport.user.userId, updatePostDto, postId,res);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res() res:Response,@Request() req) {
    return this.postsService.remove(id,req.session.passport.user.userId,res);
  }
}
