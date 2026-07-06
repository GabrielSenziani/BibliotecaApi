import express from "express";

import { loginUsuario, registrarUsuario } from "../controllers/usuariosController.js";


const router = express.Router()

router.post("/cadastro", registrarUsuario)
router.post("/login", loginUsuario)

export default router