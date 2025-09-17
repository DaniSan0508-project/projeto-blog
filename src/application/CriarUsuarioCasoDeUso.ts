import { User } from "../domain/User";
import { IUserRepository } from "../repositories/IUserRepository";

interface CriarUsuarioRequest {
    name: string;
    email: string;
}

export class CriarUsuarioCasoDeUso {
    constructor(private userRepository: IUserRepository) { }

    async executar({ name, email }: CriarUsuarioRequest): Promise<User> {

        if (!name) {
            throw new Error("Nome do usuário não pode ser vazio.");
        }
        if (!email) {
            throw new Error("Email do usuário não pode ser vazio.");
        }

        const emaiJalEmUso = await this.userRepository.findByEmail(email);
        if (emaiJalEmUso) {
            throw new Error("Email já está em uso.");
        }

        const novoUsuario = new User();
        novoUsuario.name = name;
        novoUsuario.email = email;

        const usuarioSalvo = await this.userRepository.save(novoUsuario);

        return usuarioSalvo;

    }
}