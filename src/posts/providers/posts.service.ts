import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { ResponseService } from 'src/response.service';

@Injectable()
export class PostsService extends ResponseService{
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>,

    @InjectRepository(MetaOptions)
    private readonly metaOptionRespository:Repository<MetaOptions>,

    private readonly tagsService: TagsService,
  ) {
    super()
  }

  public async create(@Body() createPostDto:CreatePostDto){
    let author = await this.usersService.findOneById(createPostDto.authorId)
    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    let post = this.postRepository.create({
      ...createPostDto,
      author:author,
      tags:tags,
    });
    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    // const user = this.usersService.findOneById(userId);
    let posts = await this.postRepository.find({
      relations:['metaOptions','author','tags']
    })
    return this.response(200,"success",posts,'All posts get Succesfully')
  }
  public async delete(id:number) {
    
     
    await this.postRepository.delete({id})
    return {
      deleted:true,
      id
    }
    // relation with post
    // let post = await this.postRepository.findOne({
    //   where:{id:id},
    //   relations:['metaOptions']
    // })
    // for inverse relation
    // let inversePost = await this.metaOptionRespository.find({
    //   where:{id:post.metaOptions.id},
    //   relations:['post']
    // })

  }

  public async update(patchPostsDto : PatchPostDto){
    let tags = await this.tagsService.findMultipleTags(patchPostsDto.tags)
    let post = await this.postRepository.findOneBy({id:patchPostsDto.id})
    post.title = patchPostsDto.title ??  post.title
    post.content = patchPostsDto.content ?? post.content
    post.status = patchPostsDto.status ?? post.status
    post.postType= patchPostsDto.postType ?? post.postType
    post.slug = patchPostsDto.slug ?? post.slug
    post.featuredImageUrl = patchPostsDto.featuredImageUrl ?? post.featuredImageUrl
    post.publishOn = patchPostsDto.publishOn ??post.publishOn
    post.tags = tags
    return await this.postRepository.save(post)
  }
}
