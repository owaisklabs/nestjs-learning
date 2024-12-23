import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOptions } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {

    constructor(
        @InjectRepository(MetaOptions)
        private readonly metaOptionRepositry : Repository<MetaOptions>
    ){}

    public async create(createMetaOPtionsDto : CreatePostMetaOptionsDto){
        let metaOption = this.metaOptionRepositry.create(createMetaOPtionsDto);
        return await this.metaOptionRepositry.save(metaOption);
    }
}
