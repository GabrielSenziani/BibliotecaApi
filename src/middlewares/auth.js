import jsonwebtoken from "jsonwebtoken";

export function middlewareAuth (req, res, next) {
    const pegaToken = req.headers.authorization

    if (pegaToken === undefined) {
      return res.status(401).json({
        mensagem: "Acesso não autorizado"
      })
    }
    
    const token = pegaToken.split(" ")[1]

    try{
     const tokenValido = jsonwebtoken.verify(token, process.env.JWT_SECRET)

     next()
    } catch (erro) {
        return res.status(401).json({
            erro: "Acesso não autorizado"
        })
    }
}