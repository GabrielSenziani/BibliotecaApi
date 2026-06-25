import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import express from "express";
import { Usuario } from "../models/Usuario.js";


const router = express.Router()

router.post("/cadastro", async (req, res) => {
    if (req.body.email === undefined || req.body.email === null || req.body.senha === undefined || req.body.senha === null) {
        return res.status(400).json({
            mensagem: "É necessário preencher os campos de email e senha"
        })
    }
    if (req.body.email.trim() === "" || req.body.senha.trim() === "") {
        return res.status(400).json({
            mensagem: "Campos em branco não são permitidos"
        })
    }
    if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
    return res.status(400).json({
        mensagem: "Email inválido"
    })
   }
    try {
     if (req.body.senha.length < 6) {
        return res.status(400).json({
            mensagem: "Menos que 6 caracteres não são permitidos"
        })
     }
     if (!/[0-9]/.test(req.body.senha)) {
       return res.status(400).json({
           mensagem: "É necessário haver números em sua senha"
       })
     }
     if (!/[a-zA-Z]/.test(req.body.senha)) {
        return res.status(400).json({
           mensagem: "É necessário pelo menos uma letra em sua senha"
        })
     }
     if (!/^[a-zA-Z0-9]+$/.test(req.body.senha)) {
      return res.status(400).json({
        mensagem: "O uso de caracteres especiais não são permitidos"
      })
     }
     const emailRepetido = await Usuario.findOne({ email: req.body.email});

     if (emailRepetido) {
        return res.status(400).json({
            mensagem: "O email já existe"
        })
     }

     const senhaCriptografada = await bcrypt.hash(req.body.senha, 10)
     
     await Usuario.create({
        email: req.body.email,
        senha: senhaCriptografada
     })

     return res.status(201).json({
        mensagem: "Usuario cadastrado"
     })
    } catch (erro) {
     return res.status(500).json({
        erro: "Erro interno no servidor"
     })
    }
})

router.post("/login", async (req, res) => {
    if (req.body.email === undefined || req.body.senha === undefined) {
        return res.status(400).json({
            mensagem: "Os campos email e senha são obrigatórios"
        })
    } try {
      const encontraUsuarioPorEmail = await Usuario.findOne({email: req.body.email})

    if (!encontraUsuarioPorEmail) {
        return res.status(404).json({
            mensagem: "Não foi possivel encontrar o email do usuario"
        })
    }

    const comparaSenhaEHash = await bcrypt.compare(req.body.senha, encontraUsuarioPorEmail.senha)

    if (!comparaSenhaEHash) {
        return res.status(400).json({
            mensagem: "Senha incorreta"
        })
    }
    const token = jsonwebtoken.sign(
    { id: encontraUsuarioPorEmail._id},
     process.env.JWT_SECRET,
     { expiresIn: "1d" }
    )

    return res.status(200).json(token)
   } catch (erro) {
    return res.status(500).json({
        erro: "Erro interno no servidor"
    })
   }

})

export default router