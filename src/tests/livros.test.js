import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"

import { Usuario } from "../models/Usuario.js"
import { connectionDB } from "../database/connection.js"
import { Livro } from "../models/Livro.js"

let token
let idLivro
let idLivroCriado

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
    const deletaLivroCriado = await Livro.deleteOne({ _id: idLivro })
    const deletaLivro = await Livro.deleteOne({ _id: idLivroCriado })

    await mongoose.connection.close()
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

test("POST livro", async () => {
    const resposta = await request(app)
    .post("/livros")
    .send({ titulo: "Bleach", autor: "Senziani"})
    .set("Authorization", `Bearer ${token}`)

    expect(resposta.status).toBe(201)

    idLivroCriado = resposta.body._id
})

test("PUT livro", async () => {
    const atualiza = await request(app)
    .put(`/livros/${idLivroCriado}`)
    .send({ titulo: "Bleach", autor: "Cassolato" })
    .set("Authorization", `Bearer ${token}`)

    expect(atualiza.status).toBe(200)
})