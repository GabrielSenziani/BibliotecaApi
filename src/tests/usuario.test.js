import mongoose from "mongoose"
import request from "supertest"
import app from "../app.js"

import { Usuario } from "../models/Usuario.js"
import { connectionDB } from "../database/connection.js"

beforeAll(async () => {
    await connectionDB();
});

afterAll(async () => {
    await Usuario.deleteOne({ email: "gabriel111@gmail.com" });
    await mongoose.connection.close();
});


test("POST usuario novo", async () => {
    const resposta = await request(app).post("/usuarios/cadastro").send({ email: "gabriel111@gmail.com", senha: "gab123" })

    expect(resposta.status).toBe(201)
})