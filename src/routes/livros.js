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
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                     example: O mal do saber
 *                   autor:
 *                     type: string
 *                     example: Socrates
 *                   disponibilidade:
 *                     type: boolean
 *                     example: true
 *                   capa:
 *                     type: string
 *                     example: example: https://res.cloudinary.com/.../capa.jpg
 */
router.get("/", livrosRegistrados)
router.get("/:id", buscarLivroPorID)
router.post("/", criarLivro)
router.post("/:id/capa", upload.single("capa") ,uploadCapaLivro)
router.post("/:id/emprestar", emprestarLivro)
router.post("/:id/devolver", devolverLivro)
router.put("/:id", atualizarLivro)
router.delete("/:id", deletarLivro)


export default router