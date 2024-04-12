import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Like,Post,Auth])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
