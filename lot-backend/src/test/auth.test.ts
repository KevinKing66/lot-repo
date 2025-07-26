// import request from "supertest";
// import app from "../src/app"; // tu instancia de express

// describe("AuthController", () => {
//   it("should authenticate with valid credentials", async () => {
//     const response = await request(app).post("/api/auth/login").send({
//       username: "admin",
//       password: "1234"
//     });
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("token");
//   });

//   it("should reject invalid credentials", async () => {
//     const response = await request(app).post("/api/auth/login").send({
//       username: "admin",
//       password: "wrong"
//     });
//     expect(response.status).toBe(401);
//   });
// });
