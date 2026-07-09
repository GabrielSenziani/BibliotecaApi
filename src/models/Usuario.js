import mongoose from "mongoose"

const UsuarioSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    senha: {
        type: String,
        required: true
    }
});

export const Usuario = mongoose.model("Usuario", UsuarioSchema);