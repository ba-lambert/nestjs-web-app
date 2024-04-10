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
  async create( userId:any,data:any) {
    try{
      const newPost = this.postRepository.create({auth:userId,...data})
      const savePost = await this.postRepository.save(newPost)
      return savePost;
    }catch(err){
      console.log(err);
      
      throw new Error(err)
    }
  }

  async findAll(userId: any, res: any) {
    try {
        const posts = await this.postRepository.find({
            where: { auth: {id:userId} }
        });

        if (!posts || posts.length == 0) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: "No posts found for the given user" });
        }

        return res.status(HttpStatus.OK).json(posts);
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching posts",error:error });
    }
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
