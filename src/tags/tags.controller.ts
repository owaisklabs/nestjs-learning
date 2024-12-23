import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {

    constructor(
        private readonly tagService: TagsService,
    ){}

    @Post()
    public create (@Body() createTagDto:CreateTagDto){
        return this.tagService.create(createTagDto)
    }

    @Get()
    public getTags(@Query('id',ParseIntPipe)id:number){
        return this.tagService.findAll(id)

    }
}
