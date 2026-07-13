import logger from "../config/logger.js";

import { Livro } from "../models/Livro.js";
import mongoose from "mongoose";

export const livrosRegistrados = async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    
    const pular = (page - 1) * limit

    const livros = await Livro.find().skip(pular).limit(limit);

    logger.info("Livros registrados com sucesso")
         
    return res.status(200).json(livros)
}

export const buscarLivroPorID = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        logger.warn("Usuario tentou buscar um livro com formato de ID invalido")

        return res.status(400).json({
          mensagem: "formato do ID invalido"
        })
      }
      try {
            const livro = await Livro.findById(req.params.id)
            
           if (!livro) {
            logger.warn("Não foi possivel encontrar o id do livro")

            return res.status(404).json({
              mensagem: "Id não encontrado"
            })
           } else {
            return res.status(200).json(livro)
           }
    
          } catch (erro) {
           logger.error("Erro inesperado na rota de buscarLivroPorId", { erro: erro.message })

           return res.status(500).json({
            erro: "erro inesprado do servidor"
           })
          }
}

export const criarLivro = async (req, res) => {
    const { titulo, autor } = req.body;

    if (autor === undefined || titulo === undefined) {
          logger.warn("O usuario não preencheu os campos 'autor' ou 'titulo'")

          return res.status(400).json({
           mensagem: "Os campos 'autor' e 'titulo' são obrigatórios"
        });
        }
        if (autor.trim() === "" || titulo.trim() === "") {
           logger.warn("O usuario deixou os campos 'autor' ou 'titulo' em branco")

          return res.status(400).json({
            mensagem: "Campo em branco não são permitidos"
        }); 
      } try {
        const livroCriado = await Livro.create({titulo, autor});
        
        logger.info("Livro criado com sucesso", { livro: livroCriado })

        return res.status(201).json(livroCriado);
      } catch (erro) {

        logger.error("Erro inesperado na rota de criarLivro", { erro: erro.message })
        
        return res.status(500).json({ erro: "Erro interno do servidor" });
      }
}

export const emprestarLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        logger.warn("O usuario tentou colocar um ID invalido na rota de emprestarLivro")

        return res.status(400).json({
          mensagem: "formato do ID invalido"
        })
      }
       try {
            const livroEmprestado = await Livro.findById(req.params.id)
            
           if (!livroEmprestado) {
            logger.warn("Não foi possivel encontrar o ID do livro na rota emprestarLivro")

            return res.status(404).json({
              mensagem: "Id não encontrado"
            })
           } if (livroEmprestado.disponibilidade === false){
            logger.warn("O livro que o usuario pediu ja esta indisponivel, então não foi possivel concluir a ação")

            return res.status(400).json({
              mensagem: "O livro está indisponivel"
            })
           }
            else if (livroEmprestado.disponibilidade === true) {
              livroEmprestado.disponibilidade = false
              await livroEmprestado.save()
              logger.info("Livro emprestado com sucesso")

              return res.status(200).json(livroEmprestado)
            }
    
          } catch (erro) {
           logger.error("Erro inesperado na rota de emprestarLivro", { erro: erro.message })

           return res.status(500).json({
            erro: "erro inesprado do servidor"
           })
          }
}

export const devolverLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        logger.warn("O usuario tentou colocar um ID invalido na rota de devolverLivro")

        return res.status(400).json({
          mensagem: "formato do ID invalido"
        })
      }
       try {
            const livroDevolvido = await Livro.findById(req.params.id)
            
           if (!livroDevolvido) {
             logger.warn("Não foi possivel encontrar o ID do livro na rota devolverLivro")

            return res.status(404).json({
              mensagem: "Id não encontrado"
            })
           } if (livroDevolvido.disponibilidade === true){
             logger.warn("O livro que o usuario pediu ja esta disponivel, então não foi possivel concluir a ação")

            return res.status(400).json({
              mensagem: "O livro já está disponivel"
            })
           }
            else if (livroDevolvido.disponibilidade === false) {
              livroDevolvido.disponibilidade = true
              await livroDevolvido.save()
              logger.info("Livro devolvido com sucesso")

              return res.status(200).json(livroDevolvido)
            }
    
          } catch (erro) {
           logger.error("Erro inesperado na rota de devolverLivro", { erro: erro.message })

           return res.status(500).json({
            erro: "erro inesprado do servidor"
           })
          }
}

export const atualizarLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        logger.warn("O usuario tentou colocar um ID invalido na rota de atualizarLivro")

        return res.status(400).json({
          mensagem: "formato do ID invalido"
        });
      };
    
      try {
        const { id } = req.params;
        const novosDados = req.body;
    
        const atualizaLivroEAutor = await Livro.findByIdAndUpdate(id, novosDados, { returnDocument: 'after', runValidators: true });
    
        if(atualizaLivroEAutor === null) {
          logger.warn("Não foi possivel encontrar o ID do livro na rota atualizarLivro")

          return res.status(404).json({
            mensagem: "Id não encontrado"
          })
        } else {
          logger.info("Livro atualizado com sucesso")

          return res.status(200).json(atualizaLivroEAutor);
        }
      } catch (erro) {
       logger.error("Erro inesperado na rota de atualizar livro", { erro: erro.message })
       return res.status(500).json({ erro: "Erro interno no servidor" });
      }
}

export const deletarLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        logger.warn("O usuario tentou colocar um ID invalido na rota de deletarLivro")
        return res.status(400).json({
          mensagem: "formato do ID invalido"
        });
      };
    
      try {
        const { id } = req.params;
    
        const deletaLivro = await Livro.findByIdAndDelete(id);
    
        if(deletaLivro === null) {
          logger.warn("Não foi possivel encontrar o id do livro na rota de deletarLivro")

          return res.status(404).json({
            mensagem: "Id não encontrado"
          })
        } else {
          logger.info("Livro deletado com sucesso")

          res.status(200).json({
            mensagem: "Livro deletado"
          });
        }
      } catch (erro) {
       logger.error("Erro inesperado na rota de deletarLivro", { erro: erro.message })
       res.status(500).json({ erro: "Erro interno no servidor" });
      }
}