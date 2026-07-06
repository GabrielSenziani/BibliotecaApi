import express from "express";

import { atualizarLivro, buscarLivroPorID, criarLivro, deletarLivro, devolverLivro, emprestarLivro, livrosRegistrados } from "../controllers/livrosController.js";

const router = express.Router()

router.get("/", livrosRegistrados)
router.get("/:id", buscarLivroPorID)
router.post("/", criarLivro)
router.post("/:id/emprestar", emprestarLivro)
router.post("/:id/devolver", devolverLivro)
router.put("/:id", atualizarLivro)
router.delete("/:id", deletarLivro)


export default router