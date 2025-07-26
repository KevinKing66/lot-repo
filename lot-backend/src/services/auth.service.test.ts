// import { AuthService } from "../services/auth.service";
// import { User } from "../entities/User";
// import * as bcrypt from "bcrypt";
// import { JwtUtils } from "../utils/jwt";

// // Mock de JwtUtils
// jest.mock("../utils/jwt", () => ({
//     JwtUtils: {
//         generateToken: jest.fn(),
//         verifyToken: jest.fn()
//     }
// }));

// describe("AuthService", () => {
//     let authService: AuthService;
//     let mockUserRepo: any;

//     beforeEach(() => {
//         mockUserRepo = {
//             findOne: jest.fn(),
//             create: jest.fn(),
//             save: jest.fn()
//         };

//         // Reemplazar el repositorio real por el mock
//         authService = new AuthService();
//         (authService as any).userRepo = mockUserRepo;
//     });

//     describe("login", () => {
//         it("debería lanzar error si el usuario no existe", async () => {
//             mockUserRepo.findOne.mockResolvedValue(null);

//             await expect(authService.login("test@mail.com", "pass"))
//                 .rejects
//                 .toThrow("User not found");
//         });

//         it("debería lanzar error si la contraseña es incorrecta", async () => {
//             const fakeUser = { email: "test@mail.com", password: "hashedpass" };
//             mockUserRepo.findOne.mockResolvedValue(fakeUser);
//             jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

//             await expect(authService.login("test@mail.com", "wrongpass"))
//                 .rejects
//                 .toThrow("Invalid credentials");
//         });

//         it("debería retornar el token si las credenciales son válidas", async () => {
//             const fakeUser = { id: 1, email: "test@mail.com", password: "hashedpass" };
//             mockUserRepo.findOne.mockResolvedValue(fakeUser);
//             jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
//             (JwtUtils.generateToken as jest.Mock).mockReturnValue("mocked.jwt.token");

//             const result = await authService.login("test@mail.com", "rightpass");

//             expect(result).toEqual({ token: "mocked.jwt.token" });
//             expect(JwtUtils.generateToken).toHaveBeenCalledWith({ id: 1, email: "test@mail.com" });
//         });
//     });
// });
