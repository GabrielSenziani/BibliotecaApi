import express from "express";

import livroRouter from "./routes/livros.js";
import usuarioRouter from "./routes/usuario.js"
import { middlewareAuth } from "./middlewares/auth.js";


const app = express();


app.use(express.json());

app.use("/livros", middlewareAuth, livroRouter);

app.use("/usuarios", usuarioRouter)

export default app