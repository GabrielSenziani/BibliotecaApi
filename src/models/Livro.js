import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
   },
   autor: {
    type: String,
    required: true
   },
   disponibilidade: {
    type: Boolean,
    default: true
   },
   capa: {
    type: String,
    required: false
   },
});

export const Livro = mongoose.model("Livro", LivroSchema)