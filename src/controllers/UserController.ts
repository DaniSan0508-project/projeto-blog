import { Request, Response } from "express";
import { CriarUsuarioCasoDeUso } from "../application/CriarUsuarioCasoDeUso";

export class UserController {
    constructor(private criarUsuarioCasoDeUso: CriarUsuarioCasoDeUso) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email } = request.body;

            const usuario = await this.criarUsuarioCasoDeUso.executar({ name, email });

            return response.status(201).json(usuario);
        } catch (err) {
            if (err instanceof Error) {
                return response.status(400).json({ message: err.message });
            }

            return response.status(500).json({ message: "Internal Server Error" });
        }
    }
}