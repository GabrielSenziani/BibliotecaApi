import logger from "../config/logger.js";

import jsonwebtoken from "jsonwebtoken";

export function middlewareAuth (req, res, next) {
    const pegaToken = req.headers.authorization

    if (pegaToken === undefined) {
      logger.warn("Requisição sem token de autenticação")

      return res.status(401).json({
        mensagem: "Acesso não autorizado"
      })
    }
    
    const token = pegaToken.split(" ")[1]

    try{
     const tokenValido = jsonwebtoken.verify(token, process.env.JWT_SECRET)

     logger.info("Token JWT validado com sucesso")

     next()
    } catch (erro) {
        logger.warn("Token JWT inválido ou expirado")
       
        return res.status(401).json({
            erro: "Acesso não autorizado"
        })
    }
}