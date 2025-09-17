import { CriarUsuarioCasoDeUso } from "../../application/CriarUsuarioCasoDeUso";
import { User } from "../../domain/User";
import { IUserRepository } from "../../repositories/IUserRepository";


const mockUserRepository: IUserRepository = {
    findByEmail: jest.fn(),
    save: jest.fn()
};

describe("Caso de uso: criar usuário", () => {
    it("deve criar um novo usuário com sucesso", async () => {
        const input = { name: "John Doe", email: "johndoe@example.com" };

        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        (mockUserRepository.save as jest.Mock).mockImplementation(user => Promise.resolve(user));

        const casoDeUso = new CriarUsuarioCasoDeUso(mockUserRepository);

        const result = await casoDeUso.executar(input);

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe(input.name);
        expect(mockUserRepository.save).toHaveBeenCalled();

    });

    it("deve lançar um erro se o email já estiver em uso", async () => {

        const input = { name: "Jane Doe", email: "jane.doe@example.com" };
        const existingUser = new User();
        existingUser.name = "Jane Doe";
        existingUser.email = "jane.doe@example.com";
        existingUser.id = "123";

        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(existingUser);

        const casoDeUso = new CriarUsuarioCasoDeUso(mockUserRepository);

        await expect(casoDeUso.executar(input))
            .rejects
            .toThrow("Email já está em uso.");
    });
});