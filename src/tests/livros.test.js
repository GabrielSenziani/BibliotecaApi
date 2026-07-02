import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"

import { Usuario } from "../models/Usuario.js"
import { connectionDB } from "../database/connection.js"

let token
let idLivro

beforeAll(async () => {
    await connectionDB()
    const resposta = await request(app).post("/usuarios/cadastro").send({ email: "isadora@gmail.com", senha: "isa123" })
    const respostaLogin = await request(app).post("/usuarios/login").send({ email: "isadora@gmail.com", senha: "isa123"})
    
    token = respostaLogin.body

    const livro = await request(app).post("/livros")
    .send({ titulo: "Cavaleiro das Trevas", autor: "Gabriel Senz" })
    .set("Authorization", `Bearer ${token}`)

    idLivro = livro.body._id
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

test("DELETE livro", async () => {
  const resposta = await request(app)
  .delete(`/livros/${idLivro}`)
  .set("Authorization", `Bearer ${token}`)

  expect(resposta.status).toBe(200)
})