import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatePostMetaOptionsDto } from "../meta-options/dtos/create-post-meta-options.dto";
import { PostType } from "./enums/post-type.enum";
import { postStatus } from "./enums/post-status.enum";
import { text } from "stream/consumers";
import { MetaOptions } from "src/meta-options/meta-options.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tags.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"varchar",
        length:512,
        nullable:false
    })
    title:string

    @Column({
        type:'enum',
        enum:PostType,
        nullable:false,
        default:PostType.POST
    })
    postType:PostType

    @Column({
        type:'varchar',
        length:'256',
        nullable:false,
        unique:true,
    })
    slug:string

    @Column({
        type:'enum',
        enum:postStatus,
        nullable:false,
        default:postStatus.DRAFT
    })
    status:postStatus

    @Column({
        type:"text",
        nullable:true,
    })
    content?:string

    @Column({
        type:"text",
        nullable:true,
    })
    schema?:string

    @Column({
        type:"varchar",
        length:'1024',
        nullable:true
    })
    featuredImageUrl?:string

    @Column({
        type:"timestamp",
        nullable:true
    })
    publishOn?:Date

    @OneToOne(()=>MetaOptions,(metaOPtions)=>metaOPtions.post,{
        cascade:['remove','insert']
    })
    metaOptions?:MetaOptions

    @ManyToOne(()=>User,(user)=>user.post)
    author:User
    @ManyToMany(()=>Tag)
    @JoinTable()
    tags?:Tag[]

}