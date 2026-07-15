import express from "express";
import upload from "../config/multer.js";

import { atualizarLivro, buscarLivroPorID, criarLivro, deletarLivro, devolverLivro, emprestarLivro, livrosRegistrados, uploadCapaLivro } from "../controllers/livrosController.js";

const router = express.Router()

router.get("/", livrosRegistrados)
router.get("/:id", buscarLivroPorID)
router.post("/", criarLivro)
router.post("/:id/capa", upload.single("capa") ,uploadCapaLivro)
router.post("/:id/emprestar", emprestarLivro)
router.post("/:id/devolver", devolverLivro)
router.put("/:id", atualizarLivro)
router.delete("/:id", deletarLivro)


export default router