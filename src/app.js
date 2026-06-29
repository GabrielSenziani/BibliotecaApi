import express from "express";
import { connectionDB } from "./database/connection.js";

import livroRouter from "./routes/livros.js";
import usuarioRouter from "./routes/usuario.js"
import { middlewareAuth } from "./middlewares/auth.js";


const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/livros", middlewareAuth, livroRouter);

app.use("/usuarios", usuarioRouter)


connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor funcionando na porta ${PORT}`);
    });
});
