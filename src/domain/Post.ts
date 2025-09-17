// src/domain/Post.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @ManyToOne('User', (user: User) => user.posts)
    user!: User;
}