import logger from "../config/logger.js";

import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
    const { email, senha } = req.body


    if (email === undefined || email === null || senha === undefined || senha === null) {
            logger.warn("O usuario não preencheu os campos de email e senha")

            return res.status(400).json({
                mensagem: "É necessário preencher os campos de email e senha"
            })
        }
        if (email.trim() === "" || senha.trim() === "") {
            logger.warn("O usuario tentou cadastrar com os campos email ou senha em branco")

            return res.status(400).json({
                mensagem: "Campos em branco não são permitidos"
            })
        }
        if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).json({
            mensagem: "Email inválido"
        })
       }
        try {
         if (senha.length < 6) {
            logger.warn("O usuario tentou cadastras uma senha com menos de 6 digitos")

            return res.status(400).json({
                mensagem: "Senhas com menos que 6 caracteres não são permitidos"
            })
         }
         if (!/[0-9]/.test(senha)) {
            logger.warn("O usuario não colocou nenhum número na senha")

            return res.status(400).json({
               mensagem: "É necessário haver números em sua senha"
           })
         }
         if (!/[a-zA-Z]/.test(senha)) {
            logger.warn("O usuario não colocou nenhuma letra na senha")

            return res.status(400).json({
               mensagem: "É necessário pelo menos uma letra em sua senha"
            })
         }
         if (!/^[a-zA-Z0-9]+$/.test(senha)) {
          logger.warn("O usuario utilizou caracteres especiais na senha, caracteres especiais não são permitidos")

          return res.status(400).json({
            mensagem: "O uso de caracteres especiais não são permitidos"
          })
         }
         const emailRepetido = await Usuario.findOne({ email});
    
         if (emailRepetido) {
          logger.warn("O usuario tentou cadastrar um email na qual já existe")
            
          return res.status(400).json({
                mensagem: "O email já existe"
            })
         }
    
         const senhaCriptografada = await bcrypt.hash(senha, 10)
         
         await Usuario.create({
            email,
            senha: senhaCriptografada
         })
    
         return res.status(201).json({
            mensagem: "Usuario cadastrado"
         })
        } catch (erro) {
         logger.error("Ocorreu um erro no servidor, especificamente na rota de registrarUsuario", { erro: erro.message })

         return res.status(500).json({
            erro: "Erro interno no servidor"
         })
        }
}

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (email === undefined || senha === undefined) {
            return res.status(400).json({
                mensagem: "Os campos email e senha são obrigatórios"
            })
        } try {
          const encontraUsuarioPorEmail = await Usuario.findOne({email})
    
        if (!encontraUsuarioPorEmail) {
            return res.status(404).json({
                mensagem: "Não foi possivel encontrar o email do usuario"
            })
        }
    
        const comparaSenhaEHash = await bcrypt.compare(senha, encontraUsuarioPorEmail.senha)
    
        if (!comparaSenhaEHash) {
            logger.warn("O usuario tentou logar com uma senha inválida ao o que corresponde com o email")
            
            return res.status(400).json({
                mensagem: "Senha incorreta"
            })
        }
        const token = jsonwebtoken.sign(
        { id: encontraUsuarioPorEmail._id},
         process.env.JWT_SECRET,
         { expiresIn: "1d" }
        )

        logger.info(`Login bem-sucedido: usuário ${encontraUsuarioPorEmail._id}`)

        return res.status(200).json(token)
       } catch (erro) {
        logger.error("Ocorreu um erro no servidor, especificamente na rota de loginUsuario", { erro: erro.message })

        return res.status(500).json({
            erro: "Erro interno no servidor"
        })
       }
}