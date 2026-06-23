import express from "express";
import { Livro } from "../models/Livro.js";
import mongoose from "mongoose";

const router = express.Router()

router.get("/", async (req, res) => {
    const livrosRegistrados = await Livro.find();
     
     res.status(200).json(livrosRegistrados)
});

router.get("/:id", async (req, res) => {
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
        mensagem: "erro inesprado do servidor"
       })
      }
});

router.post("/", async (req, res) => {
    if (req.body.autor === undefined || req.body.titulo === undefined) {
      return res.status(400).json({
       mensagem: "Os campos 'autor' e 'titulo' são obrigatórios"
    })
    } 
    if (req.body.autor.trim() === "" || req.body.titulo.trim() === "") {
      return res.status(400).json({
        mensagem: "Campo em branco não são permitidos"
    }) 
  } else {
     await Livro.create({
      titulo: req.body.titulo, 
      autor: req.body.autor
    });

     return res.status(201).json({
     mensagem: "Livro criado",
    });
  }
});

export default router