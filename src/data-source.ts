// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./domain/User";
import { Post } from "./domain/Post";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "blog_user",
    password: "blog_pass",
    database: "blog_db",
    synchronize: true,
    logging: false,
    entities: [User, Post],
    migrations: [],
    subscribers: [],
})