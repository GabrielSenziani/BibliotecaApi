import express from "express";
import upload from "../config/multer.js";

import { atualizarLivro, buscarLivroPorID, criarLivro, deletarLivro, devolverLivro, emprestarLivro, livrosRegistrados, uploadCapaLivro } from "../controllers/livrosController.js";

const router = express.Router()

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros registrados
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Livro'
 */
router.get("/", livrosRegistrados)

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: É o Id único do livro gerado automaticamente pelo MongoDB
 *     summary: Retorna o livro de acordo com o id do livro
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Livro retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Formato do Id inválido
 *       404:
 *         description: Id não encontrado
 *       500:
 *         description: Erro inesperado do servidor
 */
router.get("/:id", buscarLivroPorID)

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Dados para a criação do livro
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: O titulo do livro
 *                 example: "O senhor dos Anéis"
 *               autor:
 *                 type: string
 *                 description: O autor do livro
 *                 example: J.R.R. Tolkien
 *     responses:
 *       201:
 *         description: Livro criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: >
 *           Erro na requisição. Cenários possíveis:
 *           * **Campos em branco: Campo em branco não são permitidos**
 *           * **Campos ausentes: Os campos 'autor' e 'titulo' são obrigatórios**
 *       500:
 *         description: Erro inesperado do servidor
 */
router.post("/", criarLivro)

/**
 * @swagger
 * /livros/{id}/capa:
 *   post:
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: É o Id único do livro gerado automaticamente pelo MongoDB
 *     summary: Faz upload da capa do livro
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Dados para a criação do livro
 *       required: true
 *       content: 
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - capa
 *             properties:
 *               capa:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem da capa do livro
 *     responses:
 *       200:
 *         description: Upload da capa feito com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: >
 *           Erro na requisição. Cenários possíveis:
 *           * **ID inválido: Formato do ID inválido**
 *           * **Campos ausentes: É necessário enviar uma imagem**
 *       404:
 *         description: ID não encontrado
 *       500:
 *         description: Erro inesperado do servidor
 */
router.post("/:id/capa", upload.single("capa") ,uploadCapaLivro)

/**
 * @swagger
 * /livros/{id}/emprestar:
 *   post:
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: É o Id único do livro gerado automaticamente pelo MongoDB
 *     summary: Empresta um livro 
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Livro emprestado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: >
 *           Erro na requisição. Cenários possíveis:
 *           * ** ID inválido: Formato do ID inválido**
 *           * ** Indisponibilidade: O livro já foi emprestado**
 *       404:
 *         description: Id não encontrado
 *       500:
 *         description: Erro inesperado do servidor
 */
router.post("/:id/emprestar", emprestarLivro)

/**
 * @swagger
 * /livros/{id}/devolver:
 *   post:
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: É o Id único do livro gerado automaticamente pelo MongoDB
 *     summary: Devolve um livro 
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: >
 *           Erro na requisição. Cenários possíveis:
 *           * ** ID inválido: Formato do ID inválido**
 *           * ** Indisponibilidade: O livro já foi devolvido**
 *       404:
 *         description: Id não encontrado
 *       500:
 *         description: Erro inesperado do servidor
 */
router.post("/:id/devolver", devolverLivro)

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: É o Id único do livro gerado automaticamente pelo MongoDB
 *     summary: Atualiza um livro existente
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Dados para a Atualização do livro
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: O titulo do livro
 *                 example: "O senhor dos Anéis"
 *               autor:
 *                 type: string
 *                 description: O autor do livro
 *                 example: J.R.R. Tolkien
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Formato do ID invalido
 *       404:
 *         description: ID não encontrado
 *       500:
 *         description: Erro inesperado do servidor
 */
router.put("/:id", atualizarLivro)

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: É o Id único do livro gerado automaticamente pelo MongoDB
 *     summary: Deleta um livro 
 *     tags: 
 *       - Livros
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso.
 *       400:
 *         description: Formato do ID inválido
 *       404:
 *         description: Id não encontrado
 *       500:
 *         description: Erro inesperado do servidor
 */
router.delete("/:id", deletarLivro)


export default router