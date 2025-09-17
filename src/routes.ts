// src/routes.ts
import { Router, Request, Response } from 'express';

// Importando todas as nossas peças!
import { CriarUsuarioCasoDeUso } from './application/CriarUsuarioCasoDeUso';
import { userRepository as userRepo } from './repositories/UserRepository';
import { UserController } from './controllers/UserController';

const router = Router();

const userRepository = new userRepo();

const criarUsuarioCasoDeUso = new CriarUsuarioCasoDeUso(userRepository);

const userController = new UserController(criarUsuarioCasoDeUso);

router.post('/users', (req: Request, res: Response) => {
    return userController.handle(req, res);
});


export { router };