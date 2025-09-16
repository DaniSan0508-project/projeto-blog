// src/domain/Post.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title: string;

    @Column({ type: "text" })
    content: string;

    @ManyToOne('User', (user: User) => user.posts)
    user: User;

    constructor(title: string, content: string, user: User, id?: string) {
        this.title = title;
        this.content = content;
        this.user = user;

        if (id) {
            this.id = id;
        }

        this.validate();
    }

    private validate(): void {
        if (!this.title) {
            throw new Error("Título do post não pode ser vazio.");
        }
        if (!this.content) {
            throw new Error("Conteúdo do post não pode ser vazio.");
        }
        if (!this.user) {
            throw new Error("Post deve estar associado a um usuário.");
        }
    }
}