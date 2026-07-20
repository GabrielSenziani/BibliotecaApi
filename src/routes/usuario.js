import express from "express";

import { loginUsuario, registrarUsuario } from "../controllers/usuariosController.js";


const router = express.Router()

/**
 * @swagger
 * /usuarios/cadastro:
 *   post:
 *     summary: Cadastra um novo usuario
 *     tags:
 *       -  Usuarios
 *     requestBody:
 *       description: dados para realizar o cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CredenciaisUsuario'
 *     responses:
 *       201:
 *         description: Usuario cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensagemSucesso'
 *       400:
 *         description: >
 *           Erro na requisição. Cenários possiveis
 *           * **Campo em branco: Campo em branco não são permitidos**
 *           * **Campos Ausentes: Campos ausentes não são permitidos**
 *           * **Email inválido: Formato do email invalido**
 *           * **Senha inválida: Senhas com menos que 6 caracteres, sem numeros ou sem pelo menos uma letra ou com caracteres especiais, não são permitidas**
 *           * **Email duplicado: Email inserido ja esta sendo utilizado**
 * 
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/cadastro", registrarUsuario)

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags:
 *       -  Usuarios
 *     requestBody:
 *       description: dados para realizar o login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CredenciaisUsuario'
 *     responses:
 *       200:
 *         description: "Recebe token para utilizar as rotas de livros"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenJWT'
 *       400:
 *         description: >
 *           Erro na requisição. Cenários possiveis
 *           * **Campos Ausentes: Campos ausentes não são permitidos**
 *           * **Senha invalida: Senha incorreta de acordo com os dados ja cadastrados**
 *       404:
 *         description: Não foi possivel encontrar o email do usuario
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/login", loginUsuario)

export default router