import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOptions{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:"json",
        nullable:false
    })
    metaValue:string

    @CreateDateColumn()
    createdDate:Date

    @UpdateDateColumn()
    updatedDate:Date

    @OneToOne(()=>Post,(post)=>post.metaOptions,{
        onDelete:'CASCADE'
    })
    @JoinColumn()
    post:Post


}