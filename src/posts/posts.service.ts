import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository:Repository<Post>
  ){}
  async create( userId:any,createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create({auth:userId,author:createPostDto.author,header:createPostDto.header,content:createPostDto.content})
    const savePost = await this.postRepository.save(newPost)
    return savePost;
  }

  async findAll(res:any, userId:any) {
    const posts = await this.postRepository.find({
        where: { auth: userId }
    });

    console.log(userId);

    if (!posts || posts.length == 0) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "You haven't created any post yet" });
    }
    return posts;
}


  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
