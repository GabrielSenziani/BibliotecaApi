import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"

import { Usuario } from "../models/Usuario.js"
import { connectionDB } from "../database/connection.js"

let token

beforeAll(async () => {
    await connectionDB()
    const resposta = await request(app).post("/usuarios/cadastro").send({ email: "isadora@gmail.com", senha: "isa123" })
    const respostaLogin = await request(app).post("/usuarios/login").send({ email: "isadora@gmail.com", senha: "isa123"})

    token = respostaLogin.body
})

afterAll(async () => {
    const deletaUsuario = await Usuario.deleteOne({ email: "isadora@gmail.com" })
})

test("GET livros com autenticação", async () => {
    const resposta = await request(app)
    .get("/livros")
    .set("Authorization", `Bearer ${token}`)

    expect(resposta.status).toBe(200)
})