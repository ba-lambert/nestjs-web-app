import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>
  ) { }
  async create(userId: string, post, createLikeDto: CreateLikeDto, res) {
    const postsWithLikes = await this.likeRepository.find({
      where: { post: { postId: post } },
      relations: ['post'] // Load the post relationship
  });

  console.log(postsWithLikes);
  
    // if (!postsWithLikes) {
    //   return res.status(HttpStatus.NOT_FOUND).json({ message: 'Post not found' });
    // }
    // console.log(postsWithLikes);
    
  
    // Check if the user has already liked the post
    // const existingLike = await this.likeRepository.findOne({
    //   where: { post: postsWithLikes, user: { id: userId } },
    //   relations: ['post', 'auth']
    // });
  
    if (postsWithLikes) {
      await this.likeRepository.remove(postsWithLikes);
      return res.status(HttpStatus.OK).json({ message: 'Post unliked successfully' });
    } else {
      // Create a new Like entity and associate it with the user and the post
      const newLike = new Like();
      newLike.likes = 1;
      newLike.auth = await this.authRepository.findOne({ where: { id: userId } });
      newLike.post = post;

      console.log(newLike)
  
      await this.likeRepository.save(newLike);
      const findPost = await this.postRepository.findOne({where:{postId:post}})
      // Update the post's likes array with the new Like entity
      findPost.likes.push(newLike);
      await this.postRepository.save(findPost);
  
      return res.status(HttpStatus.OK).json({ message: 'Post liked successfully' });
    }
  }
  

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
