// src/domain/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany('Post', (post: Post) => post.user)
    posts: Post[] = [];

    constructor(name: string, email: string, id?: string) {
        this.name = name;
        this.email = email;

        if (id) {
            this.id = id;
        }

        this.validate();
    }

    private validate(): void {
        if (!this.name) {
            throw new Error("Nome do usuário não pode ser vazio.");
        }
        if (!this.email) {
            throw new Error("Email do usuário não pode ser vazio.");
        }
    }
}