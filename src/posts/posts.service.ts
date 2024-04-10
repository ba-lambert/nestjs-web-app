import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

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



  async findOne(userId:string,post,res) {
    try{
      const findPost = await this.postRepository.findOne({where:{auth:{id:userId},postId:post}})
      if(!findPost){
        return res.status(HttpStatus.NOT_FOUND).json({message:"Post not found"})
      }
      return res.status(HttpStatus.ACCEPTED).json({message:"FoundPost",post:findPost})
    }catch(err){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Some thing went wrong")
    }
    return ;
  }

  async update(id: any, updatePostDto: UpdatePostDto,postId:any,res) {
    try{
      const findPost = await this.postRepository.findOne({ where: { auth:{id:id} , postId: postId } });
      if(!findPost){
        console.log('Post not found')
      }
      if(updatePostDto.author){
        findPost.author = updatePostDto.author
      }
      if(updatePostDto.content){
        findPost.content = updatePostDto.content
      }
      if(updatePostDto.header){
        findPost.header = updatePostDto.header
      }
      const savePost = await this.postRepository.save(findPost)
      return res.status(HttpStatus.ACCEPTED).json({post:savePost})
    }catch(err){
      throw new NotFoundError(`Some thing went wrong ${err}`)
    }
  }

  async remove(id: string,userId:string,res) {
    try{
      const findPost = await this.postRepository.findOne({where:{auth:{id:userId},postId:id}})
      if(!findPost){
        return res.status(HttpStatus.NOT_FOUND).json({message:"Post not found"})
      }
      await this.postRepository.remove(findPost)
      return res.status(HttpStatus.OK).json({message:"Post deleted Successfully"})
    }catch(error){

    }
  }
}
