import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tags.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
    constructor(

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }
    public async create(createTagDto: CreateTagDto) {
        let tag = this.tagRepository.create(createTagDto)
        return await this.tagRepository.save(tag)

    }
    public async findAll(id:number){
        return await this.tagRepository.findOneBy({id})
    }
    public async findMultipleTags(tags:number[]){
        return this.tagRepository.find({
            where:{
                id : In(tags)
            }
        })
    }
}

