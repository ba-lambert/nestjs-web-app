import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule, ProfileModule, PostsModule, CommentModule, LikesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
