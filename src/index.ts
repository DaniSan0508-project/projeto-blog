import "reflect-metadata";
import express from 'express';
import { AppDataSource } from './data-source';
import { router } from './routes';

AppDataSource.initialize()
    .then(() => {

        const app = express();
        const port = 3000;

        app.use(express.json());

        app.use(router);

        app.listen(port, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${port}`);
        });
        // ----------------------------------------------------

    })
    .catch((err) => {
        console.error("❌ Erro durante a inicialização da fonte de dados:", err);
    });