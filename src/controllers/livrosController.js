import { Livro } from "../models/Livro.js";
import mongoose from "mongoose";

export const livrosRegistrados = async (req, res) => {
    const livros = await Livro.find();
         
    res.status(200).json(livros)
}

export const buscarLivroPorID = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          mensagem: "formato do ID invalido"
        })
      }
      try {
            const livro = await Livro.findById(req.params.id)
            
           if (!livro) {
            return res.status(404).json({
              mensagem: "Id não encontrado"
            })
           } else {
            return res.status(200).json(livro)
           }
    
          } catch (erro) {
           res.status(500).json({
            erro: "erro inesprado do servidor"
           })
          }
}

export const criarLivro = async (req, res) => {
    const { titulo, autor } = req.body;

    if (autor === undefined || titulo === undefined) {
          return res.status(400).json({
           mensagem: "Os campos 'autor' e 'titulo' são obrigatórios"
        });
        }
        if (autor.trim() === "" || titulo.trim() === "") {
          return res.status(400).json({
            mensagem: "Campo em branco não são permitidos"
        }); 
      } try {
        const livroCriado = await Livro.create({titulo, autor});
        return res.status(201).json(livroCriado);
      } catch (erro) {
        return res.status(500).json({ erro: "Erro interno do servidor" });
      }
}

export const emprestarLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          mensagem: "formato do ID invalido"
        })
      }
       try {
            const livroEmprestado = await Livro.findById(req.params.id)
            
           if (!livroEmprestado) {
            return res.status(404).json({
              mensagem: "Id não encontrado"
            })
           } if (livroEmprestado.disponibilidade === false){
            return res.status(400).json({
              mensagem: "O livro está indisponivel"
            })
           }
            else if (livroEmprestado.disponibilidade === true) {
              livroEmprestado.disponibilidade = false
              await livroEmprestado.save()
              
              return res.status(200).json(livroEmprestado)
            }
    
          } catch (erro) {
           res.status(500).json({
            erro: "erro inesprado do servidor"
           })
          }
}

export const devolverLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          mensagem: "formato do ID invalido"
        })
      }
       try {
            const livroDevolvido = await Livro.findById(req.params.id)
            
           if (!livroDevolvido) {
            return res.status(404).json({
              mensagem: "Id não encontrado"
            })
           } if (livroDevolvido.disponibilidade === true){
            return res.status(400).json({
              mensagem: "O livro já está disponivel"
            })
           }
            else if (livroDevolvido.disponibilidade === false) {
              livroDevolvido.disponibilidade = true
              await livroDevolvido.save()
              
              return res.status(200).json(livroDevolvido)
            }
    
          } catch (erro) {
           res.status(500).json({
            erro: "erro inesprado do servidor"
           })
          }
}

export const atualizarLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          mensagem: "formato do ID invalido"
        });
      };
    
      try {
        const { id } = req.params;
        const novosDados = req.body;
    
        const atualizaLivroEAutor = await Livro.findByIdAndUpdate(id, novosDados, { returnDocument: 'after', runValidators: true });
    
        if(atualizaLivroEAutor === null) {
          return res.status(404).json({
            mensagem: "Id não encontrado"
          })
        } else {
          res.status(200).json(atualizaLivroEAutor);
        }
      } catch (erro) {
       res.status(500).json({ erro: "Erro interno no servidor" });
      }
}

export const deletarLivro = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          mensagem: "formato do ID invalido"
        });
      };
    
      try {
        const { id } = req.params;
    
        const deletaLivro = await Livro.findByIdAndDelete(id);
    
        if(deletaLivro === null) {
          return res.status(404).json({
            mensagem: "Id não encontrado"
          })
        } else {
          res.status(200).json({
            mensagem: "Livro deletado"
          });
        }
      } catch (erro) {
       res.status(500).json({ erro: "Erro interno no servidor" });
      }
}